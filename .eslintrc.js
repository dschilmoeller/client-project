// eslint-disable-next-line no-undef
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  ignorePatterns: ["**/.eslintrc.js"],
  rules: {
    indent: ["error", 4],
    quotes: ["error", "single"],
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    "no-unused-vars": "off",
    "no-undef": "off",
    "react/prop-types": 0,
    "react/jsx-no-undef": "off",
    "react/no-unknown-property": "off"
  },
};
