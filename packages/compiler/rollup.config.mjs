import cleanup from "rollup-plugin-cleanup";
import filesize from "rollup-plugin-filesize";

export default {
  input: "src/index.js",
  plugins: [cleanup()],
  output: [
    {
      file: "dist/gob3.js",
      format: "esm",
      plugins: [filesize()],
    },
  ],
};
