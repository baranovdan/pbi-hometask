import * as fs from "fs";
import * as path from "path";
import Config from "./types/config";
import FileInfo from "./types/file-info";

const appDir = "./app/";
const filesJsonPath = path.resolve(appDir + "files.json");
const appSrcPath = path.resolve(appDir + "src/");
const filesJson = fs.readFileSync(filesJsonPath, "utf8");
const config: Config = JSON.parse(filesJson);

if (!fs.existsSync(appSrcPath)) {
  fs.mkdirSync(appSrcPath);
}

Promise.all(
  config.files.map(
    async (fileInfo: FileInfo) =>
      new Promise(() => {
        const filePath = path.resolve(appDir, fileInfo.file);
        const fileContent = fileInfo.content;

        fs.writeFileSync(filePath, fileContent);
      })
  )
);