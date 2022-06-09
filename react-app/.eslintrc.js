module.exports = {
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    /* jest only */ 'testing-library',
    'jest-dom',
  ],
  extends: [
    'next',
    'next/core-web-vitals',
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // jest only
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': { // needed for alias
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['./', 'node_modules'],
      },
    },
  },
  rules: {
    'arrow-body-style': 0, // allows return () in arrow function. Quicker to debug if leaving this at 0
    'default-param-last': 0, // order of (param=value, param)
    'import/extensions': [ // needed for alias
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/function-component-definition': [ // needed for arrow functions
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-curly-brace-presence': 0, // () => (returnvalue) - turn this off because its a pain to swap around during debugging
    'react/jsx-filename-extension': [ // needed for alias
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/react-in-jsx-scope': 0, // not necessary with latest react
    'react/require-default-props': 0, // not using proptypes so as long as a default is supplied inside the function (param=val)
    'testing-library/no-render-in-setup': 0 // actually this is bad - reduces rerendering time for performant tests
  },
}
