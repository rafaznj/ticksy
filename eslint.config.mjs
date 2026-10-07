import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";

import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

import pluginRouter from "@tanstack/eslint-plugin-router";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(
  globalIgnores(["**/dist/**", "**/node_modules/**", "**/coverage/**"]),
  globalIgnores(["frontend/src/routeTree.gen.ts"]),
  globalIgnores(["backend/src/database/drizzle/migrations/**"]),

  js.configs.recommended,

  ...tseslint.configs.recommended,

  prettier,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

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
      "@typescript-eslint/no-empty-object-type": "off",

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
      "@tanstack/router": pluginRouter,
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

      "@tanstack/router/create-route-property-order": "error",
    },
  },

  {
    files: ["frontend/src/routes/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },

  {
    files: ["backend/src/database/drizzle/**/*.ts"],

    rules: {
      "no-console": ["warn", { allow: ["log", "warn", "error"] }],
    },
  },
);
