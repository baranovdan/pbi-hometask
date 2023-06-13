import * as fs from "fs";
import * as path from "path";

interface FileObject {
  file: string;
  content: string;
  entry?: boolean;
}

interface Config {
  destination: string;
  bundleName: string;
  files: FileObject[];
}

// Read the JSON file
const jsonFilePath = "files.json"; // Replace with the actual file path
const jsonData = fs.readFileSync(jsonFilePath, "utf8");
const config: Config = JSON.parse(jsonData);

// Create the output directory if it doesn't exist
const outputDir = path.resolve(config.destination);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Iterate over each file object in the JSON
config.files.forEach((fileObj) => {
  const filePath = path.resolve(fileObj.file);
  const fileContent = fileObj.content;

  // Create the source file
  fs.writeFileSync(filePath, fileContent);

  // If the entry flag is set, create or update the bundle file
  if (fileObj.entry) {
    const bundleFilePath = path.resolve(config.destination, config.bundleName);
    const existingBundleContent = fs.existsSync(bundleFilePath)
      ? fs.readFileSync(bundleFilePath, "utf8")
      : "";

    // Append the file content to the existing bundle file
    fs.writeFileSync(
      bundleFilePath,
      existingBundleContent + "\n" + fileContent
    );
  }

  console.log(`Created file: ${filePath}`);
});

console.log("Source files created successfully.");
