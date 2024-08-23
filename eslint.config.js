// eslint.config.js
import { ESLint } from "eslint";

export default {
  ignores: ["node_modules", "dist"],
  rules: {
    "no-console": "warn",
    indent: ["error", 2],
    // Add your other rules here
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  // Add other configuration options as needed
};
