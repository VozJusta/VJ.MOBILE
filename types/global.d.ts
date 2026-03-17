// Type declarations for importing plain .css files in the project
// Allows side-effect imports like: import "./global.css";

declare module "*.css";

// If you ever use CSS Modules (filename.module.css), this provides typed class names
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
