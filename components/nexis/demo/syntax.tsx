import * as React from "react";
import { N } from "./demo-data";

/* ------------------------------------------------------------------ */
/*  ANSI -> JSX (terminal output, §8.5)                                */
/* ------------------------------------------------------------------ */
const ANSI_COLORS: Record<string, string> = {
  "31": N.red,
  "32": N.green,
  "33": N.yellow,
  "34": N.blue,
  "35": N.purple,
  "36": N.teal,
  "91": N.red,
  "92": N.green,
  "93": N.yellow,
  "94": N.blue,
  "95": N.purple,
  "96": N.teal,
};

export function ansiToJsx(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\x1b\[(\d+)m/g;
  let last = 0;
  let color: string | null = null;
  let key = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    const chunk = text.slice(last, m.index);
    if (chunk) {
      parts.push(
        <span key={key++} style={color ? { color } : undefined}>
          {chunk}
        </span>
      );
    }
    const code = m[1];
    if (code === "0" || code === "39") color = null;
    else if (ANSI_COLORS[code]) color = ANSI_COLORS[code];
    last = regex.lastIndex;
  }

  const tail = text.slice(last);
  if (tail) {
    parts.push(
      <span key={key++} style={color ? { color } : undefined}>
        {tail}
      </span>
    );
  }
  return <>{parts}</>;
}

/* ------------------------------------------------------------------ */
/*  Hand-rolled syntax highlighter (§8.6) — tsx/ts + css               */
/* ------------------------------------------------------------------ */
type Rule = { type: string; pattern: string };

const TOKEN_COLOR: Record<string, string> = {
  comment: N.mutedFg,
  string: N.green,
  keyword: N.purple,
  type: N.teal,
  decorator: N.yellow,
  number: "#e0a878",
  atrule: N.purple,
  customprop: N.teal,
  property: N.blue,
};

const TSX_RULES: Rule[] = [
  { type: "comment", pattern: "\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/" },
  {
    type: "string",
    pattern:
      "`(?:[^`\\\\]|\\\\.)*`|\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'",
  },
  { type: "decorator", pattern: "@[A-Za-z_][\\w]*" },
  {
    type: "keyword",
    pattern:
      "\\b(?:import|export|from|default|const|let|var|return|function|type|interface|extends|implements|if|else|for|while|async|await|void|null|undefined|true|false|new|class)\\b",
  },
  { type: "type", pattern: "\\b[A-Z][A-Za-z0-9]*\\b" },
  { type: "number", pattern: "\\b\\d[\\w.]*\\b" },
];

const CSS_RULES: Rule[] = [
  { type: "comment", pattern: "\\/\\*[\\s\\S]*?\\*\\/" },
  { type: "atrule", pattern: "@[\\w-]+" },
  { type: "customprop", pattern: "--[\\w-]+" },
  { type: "string", pattern: "\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'" },
  { type: "number", pattern: "\\b\\d[\\w.%]*\\b" },
  { type: "property", pattern: "[a-z-]+(?=\\s*:)" },
];

function tokenize(line: string, rules: Rule[]): React.ReactNode {
  if (line.length === 0) return null;
  const combined = new RegExp(rules.map((r) => `(${r.pattern})`).join("|"), "g");
  const out: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;

  while ((m = combined.exec(line)) !== null) {
    if (m.index > last) {
      out.push(<span key={key++}>{line.slice(last, m.index)}</span>);
    }
    let color: string | undefined;
    for (let g = 0; g < rules.length; g++) {
      if (m[g + 1] !== undefined) {
        color = TOKEN_COLOR[rules[g].type];
        break;
      }
    }
    out.push(
      <span key={key++} style={color ? { color } : undefined}>
        {m[0]}
      </span>
    );
    last = combined.lastIndex;
    if (combined.lastIndex === m.index) combined.lastIndex++; // zero-width guard
  }
  if (last < line.length) {
    out.push(<span key={key++}>{line.slice(last)}</span>);
  }
  return <>{out}</>;
}

/** Highlight a single line of code. Returns styled spans. */
export function highlightLine(line: string, lang: "tsx" | "css"): React.ReactNode {
  return tokenize(line, lang === "css" ? CSS_RULES : TSX_RULES);
}
