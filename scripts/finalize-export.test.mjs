import assert from 'node:assert/strict';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const fixture = 'out/export-finalizer-test.html';
const clientManifest = '.next/server/app/test_client-reference-manifest.js';
try {
  await writeFile(fixture, '<script src="/_next/static/runtime.js"></script><script>self.__next_f.push([1,"data"])</script><script type="application/ld+json">{"name":"Nexis"}</script><script src="/site.js" defer></script>');
  const ok = spawnSync(process.execPath, ['scripts/finalize-export.mjs'], { encoding: 'utf8' });
  assert.equal(ok.status, 0, ok.stderr);
  const result = await readFile(fixture, 'utf8');
  assert(!result.includes('/_next/') && !result.includes('__next_f'));
  assert(result.includes('application/ld+json') && result.includes('src="/site.js"'));
  await writeFile(clientManifest, 'globalThis.__RSC_MANIFEST={"/test":{clientModules:{"[project]/components/future-client.tsx":{}}}};');
  const blocked = spawnSync(process.execPath, ['scripts/finalize-export.mjs'], { encoding: 'utf8' });
  assert.notEqual(blocked.status, 0);
  assert(blocked.stderr.includes('Static export cannot remove hydration'));
  console.log('Export finalizer preserves native scripts/metadata and rejects project client components.');
} finally {
  await unlink(fixture).catch(() => {});
  await unlink(clientManifest).catch(() => {});
}
