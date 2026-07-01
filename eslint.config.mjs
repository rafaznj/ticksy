// eslint.config.mjs
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  prettier,

  {
    files: ["**/*.{ts,tsx,js}"],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },

    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",

      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  {
    files: ["frontend/src/**/*.{ts,tsx}"],

    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },

    rules: {
      ...react.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/self-closing-comp": "error",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
    },
  },

  {
    files: ["backend/src/**/*.{ts,js}"],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",

      "no-console": "warn",
    },
  },

  {
    files: ["**/*.{ts,tsx,js}"],

    rules: {
      "import/no-duplicates": "error",
      "import/newline-after-import": "warn",
    },
  },
]);
