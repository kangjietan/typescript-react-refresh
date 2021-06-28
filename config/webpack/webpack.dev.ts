import * as path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshTypeScript from 'react-refresh-typescript';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const SRC_DIR = path.join(__dirname, "../../src/");
const DIST_DIR = path.join(__dirname, "../../public/");

const config: Configuration = {
  mode: "development",
  entry: SRC_DIR,
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: SRC_DIR,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()],
              }),
            },
          },
        ].filter(Boolean),
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./public/index.html",
    }),
  ].filter(Boolean),
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  devServer: {
    port: 3001,
    hot: true,
    contentBase: DIST_DIR,
  },
};

export default config;
