const path = require("path");
const glob = require("glob");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");

module.exports = (env, argv) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin(
      {
        template: "./src/index.html",
        filename: "./index.html"
      }
    ),
    new MiniCssExtractPlugin(
      {
        filename: "[name].css",
        chunkFilename: "[id].css"
      }
    ),
    new PurifyCSSPlugin(
      {
        paths: glob.sync(path.join(__dirname, "src/*")),
        minimize: true,
        purifyOptions: {
          whitelist: argv.mode == "development" && ["*"]
        }
      }
    )
  ],
  stats: {
    modules: false,
    children: false,
  }
});
