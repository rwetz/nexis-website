import sharp from 'sharp';

await Promise.all([
  sharp('public/nexis/logo.png').resize(68).webp({ quality: 85 }).toFile('public/nexis/logo-small.webp'),
  sharp('assets/signature.png').resize(158).webp({ quality: 90 }).toFile('assets/signature-small.webp'),
  ...[480, 800, 1200].flatMap(width => [
    sharp('assets/editor.webp').resize(width).webp({ quality: 80 }).toFile(`public/nexis/editor-${width}.webp`),
    sharp('assets/editor.webp').resize(width).avif({ quality: 60 }).toFile(`public/nexis/editor-${width}.avif`),
  ]),
  sharp('assets/editor.webp').resize(800).avif({ quality: 45 }).toFile('public/nexis/editor-mobile.avif'),
]);
console.log('Generated responsive hero and brand assets.');
