import FileInfo from "./file-info";

type Config = {
  destination: string;
  bundleName: string;
  files: FileInfo[];
};

export default Config;
