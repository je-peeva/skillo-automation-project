import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  //Disabling `no-empty-pattern` for fixture file
  {
    files: ["tests/fixtures/**/*.js"],
    rules: {
      "no-empty": "off",
      "no-empty-pattern": "off",
    },
  },
]);
