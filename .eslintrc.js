module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './jsconfig.json'
  },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh', 'prettier', 'import'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/require-default-props': [
      'error',
      {
        ignoreFunctionalComponents: true
      }
    ],
    'react/jsx-filename-extension': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'type',
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown'
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'antd',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@hooks/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@utils/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@pages/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@components/*',
            group: 'internal',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['@tanstack*'],
        alphabetize: {
          order: 'asc'
        }
      }
    ]
  }
}
