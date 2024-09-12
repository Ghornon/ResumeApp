import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: { globals: globals.browser },
        // ...pluginReact.configs.flat.recommended,
        //   languageOptions: {
        //       ...pluginReact.configs.flat.recommended.languageOptions,
        //       globals: {
        //           ...globals.serviceworker,
        //           ...globals.browser,
        //       },
        //   },
        ignores: ['node_modules', 'build', 'dist', 'public', '**/*.config.mjs'],
        rules: {
            'react/react-in-jsx-scope': 'off',
        },
    },
];
