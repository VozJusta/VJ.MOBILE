const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

let config = getDefaultConfig(__dirname);

config.resolver.alias = {
  "@": path.resolve(__dirname, "src"),
};

config.transformer.babelTransformerPath =
  require.resolve("react-native-svg-transformer");
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg",
);
config.resolver.sourceExts.push("svg");
config.resolver.sourceExts.push("cjs");

config.resolver.blockList = [
  /.*[\\\/]\.pnpm-cache[\\\/].*/,
  /.*[\\\/]AppData[\\\/]Local[\\\/]pnpm-cache[\\\/].*/,
  /.*[\\\/]pnpm-cache[\\\/]dlx[\\\/].*/,
];

config.watchFolders = [path.resolve(__dirname)];
config.projectRoot = __dirname;

config = withNativeWind(config, { input: "./src/styles/global.css" });

module.exports = config;
