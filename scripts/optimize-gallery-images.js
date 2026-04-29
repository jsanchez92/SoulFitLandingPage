import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'public', 'gallery');
const outputDir = path.join(rootDir, 'public', 'images', 'gallery');
const widths = [640, 960, 1280];
const imageNames = ['cardio-track', 'pesas', 'maquinas', 'spinning', 'funcional', 'recepcion'];

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
};

const getFileSize = async (filePath) => {
  const stats = await fs.stat(filePath);
  return stats.size;
};

const createBasePipeline = (inputPath, width) =>
  sharp(inputPath)
    .rotate()
    .resize({
      width,
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    })
    .toColorspace('srgb')
    .sharpen({ sigma: 0.45 });

const optimizeImage = async (name) => {
  const inputPath = path.join(sourceDir, `${name}.jpg`);
  const originalBytes = await getFileSize(inputPath);
  const generated = [];

  for (const width of widths) {
    const webpPath = path.join(outputDir, `${name}-${width}.webp`);
    const avifPath = path.join(outputDir, `${name}-${width}.avif`);

    await createBasePipeline(inputPath, width)
      .webp({
        quality: 84,
        effort: 6,
        smartSubsample: true,
      })
      .toFile(webpPath);

    await createBasePipeline(inputPath, width)
      .avif({
        quality: 58,
        effort: 6,
        chromaSubsampling: '4:2:0',
      })
      .toFile(avifPath);

    generated.push(webpPath, avifPath);
  }

  const fallbackPath = path.join(outputDir, `${name}.jpg`);
  await createBasePipeline(inputPath, Math.max(...widths))
    .jpeg({
      quality: 82,
      mozjpeg: true,
      progressive: true,
    })
    .toFile(fallbackPath);

  generated.push(fallbackPath);

  const files = await Promise.all(
    generated.map(async (filePath) => ({
      filePath,
      bytes: await getFileSize(filePath),
    })),
  );

  const generatedBytes = files.reduce((total, file) => total + file.bytes, 0);
  const savings = ((1 - generatedBytes / (originalBytes * files.length)) * 100).toFixed(1);

  return {
    name,
    originalBytes,
    generatedBytes,
    savings,
    files,
  };
};

const main = async () => {
  await fs.mkdir(outputDir, { recursive: true });

  const results = [];
  for (const name of imageNames) {
    results.push(await optimizeImage(name));
  }

  const originalTotal = results.reduce((total, result) => total + result.originalBytes, 0);
  const generatedTotal = results.reduce((total, result) => total + result.generatedBytes, 0);
  const baselineTotal = results.reduce(
    (total, result) => total + result.originalBytes * result.files.length,
    0,
  );
  const totalSavings = ((1 - generatedTotal / baselineTotal) * 100).toFixed(1);

  console.log('\nSoulFit gallery optimization complete\n');
  for (const result of results) {
    console.log(`${result.name}`);
    console.log(`  original: ${formatBytes(result.originalBytes)}`);
    console.log(`  generated total: ${formatBytes(result.generatedBytes)}`);
    console.log(`  savings vs unoptimized variants: ${result.savings}%`);
    for (const file of result.files) {
      console.log(`  - ${path.relative(rootDir, file.filePath)} (${formatBytes(file.bytes)})`);
    }
    console.log('');
  }

  console.log(`Original source total: ${formatBytes(originalTotal)}`);
  console.log(`Generated assets total: ${formatBytes(generatedTotal)}`);
  console.log(`Total savings vs unoptimized variants: ${totalSavings}%`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
