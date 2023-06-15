const path = require("path");
const files = require("./app/files.json");

entry = files.files
  .filter((file) => file.entry)
  .reduce((acc, file) => {
    const filePath = file.file;
    const name = path.basename(filePath, path.extname(filePath));
    acc[name] = "./" + path.join("app", filePath);
    return acc;
  }, {});
const multipleEntries = Object.keys(entry).length > 1;

console.log(entry);
// pathfd =  + path.join("app", "./src/main.ts");
// console.log(pathfd);
module.exports = {
  // entry: "./app/src/main.ts",
  entry,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "app/src")],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: multipleEntries ? "[name]." + files.bundleName : files.bundleName,
    path: path.resolve(__dirname, "app/output"),
  },
};
