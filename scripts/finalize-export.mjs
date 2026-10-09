import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';

// Fail rather than silently break a future React client feature. Native site.js
// owns the static pages' interactions; only Next's built-in client references
// may remain in the renderer manifests.
async function checkManifests(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await checkManifests(path);
    else if (entry.name.endsWith('_client-reference-manifest.js')) {
      const context = {};
      runInNewContext(await readFile(path, 'utf8'), context);
      for (const manifest of Object.values(context.__RSC_MANIFEST || {})) {
        for (const clientModule of Object.keys(manifest.clientModules)) {
          if (!clientModule.includes('node_modules')) throw new Error(`Static export cannot remove hydration: client component ${clientModule}`);
        }
      }
    }
  }
}
// Strip framework runtime/data from published HTML, retaining site.js and any
// JSON-LD or unrelated scripts. Development uses Next's normal dev runtime.
async function finalize(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await finalize(path);
    else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      const result = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, tag => /src="\/_next\/|self\.__next_f/.test(tag) ? '' : tag)
        .replace(/<link\b[^>]*(?:as="script"|rel="modulepreload")[^>]*>/g, '');
      if (!result.includes('src="/site.js"') && entry.name !== '404.html') throw new Error(`Missing native enhancement in ${path}`);
      await writeFile(path, result);
    }
  }
}
await checkManifests('.next/server/app');
await finalize('out');
console.log('Published static HTML without Next hydration runtime.');
