const path = require("path");

module.exports = {
  entry: "./app/src/main.ts",
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
    filename: "mega-bundle.js",
    path: path.resolve(__dirname, "app/output"),
  },
};
