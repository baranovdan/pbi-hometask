const gulp = require("gulp");
const webpack = require("webpack");
const { spawn } = require("child_process");
const webpackConfig = require("./webpack.config.js");
const fs = require("fs");
const path = require("path");

gulp.task("clean", function (onCompletion) {
  cleanDirectory("app/output");
  cleanDirectory("app/src");
  cleanDirectory("dist");

  onCompletion();
});

gulp.task("build", (onCompletion) => {
  const tscProcess = spawn("npx", ["tsc"]);
  tscProcess.on("close", () => {
    spawn("node", ["./dist/generate-source.js"]).on("close", onCompletion);
  });
});

gulp.task("bundle", (onCompletion) => {
  // add check if source file exist
  webpack(webpackConfig, () => onCompletion());
});

gulp.task("run", gulp.series("clean", "build", "bundle"));

function cleanDirectory(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    const items = fs.readdirSync(directoryPath);

    items.forEach((item) => {
      const itemPath = path.join(directoryPath, item);
      if (fs.lstatSync(itemPath).isDirectory()) {
        cleanDirectory(itemPath);
        fs.rmdirSync(itemPath);
      } else {
        fs.unlinkSync(itemPath);
      }
    });
  }
}