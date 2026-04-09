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

const pnpmDlxCache = path.resolve(
  process.env.LOCALAPPDATA || "",
  "pnpm-cache",
  "dlx",
);

config.watchFolders = [
  path.resolve(__dirname),
  pnpmDlxCache,
];

config.projectRoot = __dirname;

delete config.resolver.blockList;

config = withNativeWind(config, { input: "./src/styles/global.css" });

module.exports = config;