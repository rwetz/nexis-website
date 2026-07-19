"use client";

import { useEffect, useRef, useState } from "react";

/* Palette baked into the shader, mirrored here for the no-WebGL fallback. */
const PALETTE = ["#2b2d64", "#ffb45c", "#ff7112", "#f24405", "#33b533"];

const CFG = {
  uniforms: { u_scale: 2.5, u_warp: 3, u_speed: 1, u_contrast: 1.35 },
  colors: new Float32Array([
    0.16862745098039217, 0.17647058823529413, 0.39215686274509803,
    1, 0.7058823529411765, 0.3607843137254902,
    1, 0.44313725490196076, 0.07058823529411765,
    0.9490196078431372, 0.26666666666666666, 0.0196078431372549,
    0.2, 0.7098039215686275, 0.2,
    0.16862745098039217, 0.17647058823529413, 0.39215686274509803,
    1, 0.7058823529411765, 0.3607843137254902,
    1, 0.44313725490196076, 0.07058823529411765,
  ]),
  colorCount: 5,
  seed: 1000,
  startTime: 162.70236,
};

const VS = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

const FS = `#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec3  u_colors[8];
uniform int   u_colorCount;
uniform float u_seed;
uniform float u_scale;
uniform float u_warp;
uniform float u_speed;
uniform float u_contrast;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

vec2 seedOffset() {
  return vec2(hash11(u_seed * 0.7131), hash11(u_seed * 1.3719)) * 512.0;
}

vec2 uvCoord() {
  return (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
}

vec3 getColor(float t) {
  float n = float(u_colorCount);
  float x = fract(t) * n;
  int i = int(x) % u_colorCount;
  int j = (i + 1) % u_colorCount;
  float f = smoothstep(0.0, 1.0, fract(x));
  return mix(u_colors[i], u_colors[j], f);
}

void main() {
  vec2 uv = uvCoord();
  vec2 so = seedOffset() * 0.01;
  float t = u_time * u_speed * 0.1;
  vec2 p = uv * u_scale + so;

  vec2 q = vec2(
    snoise(p * 0.7 + t),
    snoise(p * 0.7 + vec2(3.7, 1.2) - t * 0.8)
  );
  float v  = snoise(p + u_warp * q);
  float v2 = snoise(p * 1.3 + u_warp * q.yx + vec2(4.2, 7.7) + t * 0.5);

  float tt = clamp(0.5 + (v * 0.5 + v2 * 0.15) * u_contrast, 0.0, 1.0);
  outColor = vec4(getColor(tt * 0.8 + t * 0.03), 1.0);
}
`;

/**
 * Animated fluid-gradient shader.
 *
 * Rendering is strictly best-effort: any failure (no WebGL2, shader compile
 * error, lost context that never comes back, reduced-motion preference) falls
 * back to a static CSS gradient built from the same palette, so the card
 * always has something in it.
 */
export function FluidCanvas({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let canvas: HTMLCanvasElement | null = null;
    let raf = 0;
    let attempts = 0;
    let disposed = false;
    let visible = true;

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const teardown = () => {
      stop();
      if (canvas) {
        canvas.removeEventListener("webglcontextlost", onLost);
        canvas.removeEventListener("webglcontextrestored", onRestored);
        canvas.remove();
        canvas = null;
      }
    };

    // Give up on WebGL for good: drop any half-built canvas so the CSS
    // gradient underneath becomes visible again.
    const fail = () => {
      teardown();
      setLive(false);
    };

    function onLost(e: Event) {
      e.preventDefault();
      stop();
    }
    function onRestored() {
      boot();
    }

    function boot() {
      if (disposed || !host) return;
      stop();

      const c = document.createElement("canvas");
      c.style.cssText = "display:block;width:100%;height:100%";
      c.addEventListener("webglcontextlost", onLost);
      c.addEventListener("webglcontextrestored", onRestored);

      let ctx: WebGL2RenderingContext | null = null;
      try {
        ctx = c.getContext("webgl2", {
          alpha: false,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
        });
      } catch {
        ctx = null;
      }

      if (!ctx || ctx.isContextLost()) {
        // A context can fail transiently (GPU process restart, too many live
        // contexts). Retry with a fresh canvas a few times before giving up.
        if (++attempts < 6) {
          setTimeout(boot, 250);
          return;
        }
        fail();
        return;
      }
      const gl = ctx;

      const compile = (type: number, src: string) => {
        const s = gl.createShader(type);
        if (!s) return null;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
          gl.deleteShader(s);
          return null;
        }
        return s;
      };

      const vs = compile(gl.VERTEX_SHADER, VS);
      const fs = compile(gl.FRAGMENT_SHADER, FS);
      const prog = vs && fs ? gl.createProgram() : null;
      if (!vs || !fs || !prog) {
        fail();
        return;
      }
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        fail();
        return;
      }
      gl.useProgram(prog);
      gl.bindVertexArray(gl.createVertexArray());

      const u = (n: string) => gl.getUniformLocation(prog, n);
      const uResolution = u("u_resolution");
      const uTime = u("u_time");

      gl.uniform1f(u("u_seed"), CFG.seed);
      gl.uniform3fv(u("u_colors"), CFG.colors);
      gl.uniform1i(u("u_colorCount"), CFG.colorCount);
      gl.uniform1f(u("u_scale"), CFG.uniforms.u_scale);
      gl.uniform1f(u("u_warp"), CFG.uniforms.u_warp);
      gl.uniform1f(u("u_speed"), CFG.uniforms.u_speed);
      gl.uniform1f(u("u_contrast"), CFG.uniforms.u_contrast);

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(1, Math.round(host.clientWidth * dpr));
        const h = Math.max(1, Math.round(host.clientHeight * dpr));
        if (c.width !== w || c.height !== h) {
          c.width = w;
          c.height = h;
        }
      };
      resize();
      host.replaceChildren(c);
      canvas = c;
      setLive(true);

      const t0 = performance.now();
      const frame = () => {
        raf = 0;
        if (disposed || gl.isContextLost()) return;
        resize();
        gl.viewport(0, 0, c.width, c.height);
        gl.uniform2f(uResolution, c.width, c.height);
        gl.uniform1f(uTime, CFG.startTime + (performance.now() - t0) / 1000);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        raf = requestAnimationFrame(frame);
      };
      frame();
    }

    const resume = () => {
      if (!disposed && canvas && visible && !document.hidden && raf === 0) {
        boot();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) resume();
        else stop();
      },
      { rootMargin: "200px" },
    );
    io.observe(host);

    const onVisibility = () => (document.hidden ? stop() : resume());
    document.addEventListener("visibilitychange", onVisibility);

    try {
      boot();
    } catch {
      fail();
    }

    return () => {
      disposed = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      teardown();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={className}
      style={
        live
          ? undefined
          : {
              // Static stand-in drawn from the same palette.
              background: `radial-gradient(120% 90% at 20% 15%, ${PALETTE[1]} 0%, ${PALETTE[2]} 30%, ${PALETTE[3]} 55%, ${PALETTE[0]} 100%)`,
            }
      }
    />
  );
}
