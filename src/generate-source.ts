import * as fs from "fs";
import * as path from "path";

interface FileInfo {
  file: string;
  content: string;
  entry?: boolean;
}

interface Config {
  destination: string;
  bundleName: string;
  files: FileInfo[];
}

const appPath = "./app/";
const filesJsonPath = appPath + "files.json";
const filesJson = fs.readFileSync(filesJsonPath, "utf8");
const config: Config = JSON.parse(filesJson);

const outputDir = path.resolve(config.destination);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

config.files.forEach((fileInfo: FileInfo) => {
  const filePath = path.resolve(appPath, fileInfo.file);
  const fileContent = fileInfo.content;

  fs.writeFileSync(filePath, fileContent);
});

