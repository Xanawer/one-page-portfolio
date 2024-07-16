import { ok as assert } from "node:assert/strict";
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const [inputDir, outputFile] = process.argv.slice(2);

assert(inputDir, "Input directory path not found");
assert(outputFile, "Output file path not found");

const encodingOpts = { encoding: "utf-8" };

async function processFile(inputPath) {
  const text = await readFile(inputPath, encodingOpts);
  return text
    .replace(/^(\r?\n)+/, "")
    .trimEnd()
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

async function ensureFile(filePath) {
  try {
    const stats = await stat(filePath);
    if (stats.isDirectory()) {
      console.error(`Error: ${filePath} is a directory, not a file.`);
      process.exit(1);
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`Error checking file ${filePath}:`, error);
      process.exit(1);
    }
  }
}

async function processDirectory() {
  console.log(`Input directory: ${inputDir}`);
  console.log(`Output file: ${outputFile}`);

  await ensureFile(outputFile);

  const files = await readdir(inputDir);
  const artObjects = {};

  for (const file of files) {
    let inputPath = path.join(inputDir, file);
    let artName = path.basename(file, ".txt");

    try {
      const processedText = await processFile(inputPath);
      artObjects[artName] = processedText;
      console.log(`Processed text art: ${artName}`);
    } catch (error) {
      console.error(`Error processing file ${file}: ${error.message}`);
    }
  }

  // Sort the art objects numerically
  const sortedArtArray = Object.entries(artObjects)
    .sort(([a], [b]) => {
      const numA = parseInt(a.replace("output", ""));
      const numB = parseInt(b.replace("output", ""));
      return numA - numB;
    })
    .map(([_, value]) => value);

  const moduleSource = `export default ${JSON.stringify(sortedArtArray, null, 2)};\n`;

  try {
    const outputDir = path.dirname(outputFile);
    await import("node:fs/promises").then((fs) =>
      fs.mkdir(outputDir, { recursive: true }),
    );

    await writeFile(outputFile, moduleSource, encodingOpts);
    console.log(`Text art module written to: ${outputFile}`);
  } catch (error) {
    console.error(`Error writing output file: ${error.message}`);
    console.error(`Attempted to write to: ${outputFile}`);
    process.exit(1);
  }
}

processDirectory().catch((error) => {
  console.error("An error occurred during processing:", error);
  process.exit(1);
});
