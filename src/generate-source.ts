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

const appDir = "./app/";
const filesJsonPath = path.resolve(appDir + "files.json");
const appSrcPath = path.resolve(appDir + "src/");
const filesJson = fs.readFileSync(filesJsonPath, "utf8");
const config: Config = JSON.parse(filesJson);

if (!fs.existsSync(appSrcPath)) {
  fs.mkdirSync(appSrcPath);
}
console.log(appSrcPath);

config.files.forEach((fileInfo: FileInfo) => {
  const filePath = path.resolve(appDir, fileInfo.file);
  const fileContent = fileInfo.content;

  fs.writeFileSync(filePath, fileContent);
});

