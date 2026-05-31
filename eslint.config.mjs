import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1. OBLIGATORIU: Ignoră folderele mari de build pentru a preveni blocarea terminalului
  {
    ignores: [".next/**", "node_modules/**", "dist/**", "build/**", "out/**"],
  },

  // 2. Extinde configurările Next.js
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended"
  ),

  // 3. Regulile tale customizate
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-restricted-types": [
        "error",
        {
          types: {
            Object: { message: "Use Record<string, unknown> instead" },
            String: { message: "Use string instead" },
            Number: { message: "Use number instead" },
            Boolean: { message: "Use boolean instead" },
          },
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default eslintConfig;
