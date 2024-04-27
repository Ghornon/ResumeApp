module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: { browser: true, es2022: true },
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
        "jsx": true
    },
    sourceType: "module"
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['node_modules', 'build', 'dist', 'public', '.eslintrc.cjs'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
