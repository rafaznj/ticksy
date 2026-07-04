import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";

import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/coverage/**"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  prettier,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },

    plugins: {
      import: importPlugin,
    },

    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-explicit-any": "warn",

      "import/no-duplicates": "error",
      "import/newline-after-import": "warn",
    },
  },

  {
    files: ["frontend/**/*.{ts,tsx}"],

    languageOptions: {
      globals: globals.browser,
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/self-closing-comp": "error",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
    },
  },

  {
    files: ["frontend/src/routes/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },

  {
    files: ["backend/**/*.ts"],

    languageOptions: {
      globals: globals.node,
    },

    rules: {
      "no-console": "warn",
    },
  },

  {
    files: ["backend/src/database/drizzle/**/*.ts"],

    rules: {
      "no-console": ["warn", { allow: ["log", "warn", "error"] }],
    },
  },
);
