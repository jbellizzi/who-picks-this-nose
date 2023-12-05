module.exports = {
  extends: ["../.eslintrc.cjs", "plugin:react-hooks/recommended"],
  plugins: ["react-refresh"],
  env: { browser: true, es2020: true },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
