import { Jimp } from 'jimp';

async function createIcon(size) {
  const image = new Jimp({ width: size, height: size, color: '#8b5cf6' });
  await image.write(`public/pwa-${size}x${size}.png`);
  console.log(`Created public/pwa-${size}x${size}.png`);
}

async function main() {
  await createIcon(192);
  await createIcon(512);
}

main().catch(console.error);
