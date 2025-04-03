// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [...compat.extends("next/core-web-vitals")];

// export default eslintConfig;
// eslint.config.mjs
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

export default [
  // Core ESLint rules
  js.configs.recommended,
  
  // Next.js specific setup
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      "@next/next/no-html-link-for-pages": "off", // Disable if using Next.js 13+ App Router
    },
  },
  
  // Global settings
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    ignores: [
      ".next/",
      "node_modules/",
      "out/",
      "public/admin/" // Ignore Decap CMS admin files
    ],
  },
  
  // Custom rules
  {
    rules: {
      "react/prop-types": "off", // Not needed with modern React
      "react/react-in-jsx-scope": "off", // Next.js handles React import
    },
  },
];