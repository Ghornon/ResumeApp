import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    eslintPluginPrettier,
    {
        languageOptions: { globals: globals.node },
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        // ...pluginReact.configs.flat.recommended,
        //   languageOptions: {
        //       ...pluginReact.configs.flat.recommended.languageOptions,
        //       globals: {
        //           ...globals.serviceworker,
        //           ...globals.browser,
        //       },
        //   },
        ignores: ['node_modules', 'build', 'dist', 'public', 'eslint.config.mjs'],
        rules: {
            'react/react-in-jsx-scope': 'off',
            'capitalized-comments': ['error', 'always'],
        },
    },
];
