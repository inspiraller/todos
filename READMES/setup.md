# start
npx create-next-app@latest todos-app --typescript --use-npm

# move /pages into /src/pages
rm -rf .next
mkdir src
mv styles src/styles
mv pages src/pages

# add basic react testing library render test
npm i jest ts-jest jest-css-modules-transform jest-transform-stub jest-environment-jsdom react-test-renderer @testing-library/react @types/jest @types/mocha @testing-library/react-hooks eslint-import-resolver-babel-module --save-dev


# Adding tests
**eslintrc.json** - to support additional jest eslinting...
```
{
  "extends": ["next","next/core-web-vitals"]
}
```

**.babel.config.js**
```
module.exports = {
  presets: ['next/babel'],
  "plugins": []
};
```

-----------------------------------------------
# Troubleshoot
## troubleshoot - Cannot find module 'next/babel'
- https://stackoverflow.com/questions/68163385/parsing-error-cannot-find-module-next-babel
```
npm i react@latest react-dom@latest next@latest
```
**expected**
- "next": "^12.1.6",
- "react": "^18.1.0",
- "react-dom": "^18.1.0",

**Ensure vscode root is at react-app - not a parent folder**
1. Close all files
2. CTRL SHIFT P - eslint > restart eslint server
3. OR - restart vscode 
4. Change root of vscode project to react-app
open a file
(click) terminal > output > select eslint
check no errors

## Troubleshoot - no eslint errors
- npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev

**.eslintrc.json**
```json
{
  "plugins": ["@typescript-eslint"],
  "extends": ["next", "next/core-web-vitals", "plugin:@typescript-eslint/recommended"]
}
```

## Troubleshoot - fix alias
# update tsconfig.json - to enable paths  - ensure restart
```
{
  "compilerOptions": {
    "baseUrl": "./",

    "paths": {
      "src/*": ["src/*"],
      "__tests__/*": ["__tests__/*"]
    },
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "src/*", "__tests__/*],
}
```

## Fix eslint
```
module.exports = {
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
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
    'react/jsx-filename-extension': [ // needed for alias
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
  },
}
```

***example:***
- import x from 'src/something'


-------------------------------------------------
# Final working solution

**package.json**
```json
{
  "name": "todos-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "cross-env NODE_ENV=development next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest --maxWorkers=50%",
    "prettier-log": "prettier-eslint \"src/**/*.{js,ts,tsx}\" --list-different",
    "prettier-write": "prettier-eslint --write \"src/**/*.{js,ts,tsx}\""
  },
  "dependencies": {
    "@reduxjs/toolkit": "^1.8.2",
    "axios": "^0.27.2",
    "next": "^12.1.6",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-redux": "^8.0.2",
    "redux": "^4.2.0",
    "swr": "^1.3.0"
  },
  "devDependencies": {
    "@babel/core": "^7.18.2",
    "@babel/preset-env": "^7.18.2",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/react-hooks": "^8.0.0",
    "@types/jest": "^28.1.1",
    "@types/mocha": "^9.1.1",
    "@types/node": "17.0.40",
    "@types/react": "^18.0.12",
    "@types/react-dom": "18.0.5",
    "@types/react-redux": "^7.1.24",
    "@typescript-eslint/eslint-plugin": "^5.27.1",
    "@typescript-eslint/parser": "^5.27.1",
    "cross-env": "^7.0.3",
    "eslint": "8.17.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-next": "12.1.6",
    "eslint-config-prettier": "^8.5.0",
    "eslint-import-resolver-babel-module": "^5.3.1",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-jest-dom": "^4.0.2",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-react": "^7.30.0",
    "eslint-plugin-testing-library": "^5.5.1",
    "jest": "^28.1.1",
    "jest-css-modules": "^2.1.0",
    "jest-css-modules-transform": "^4.4.2",
    "jest-environment-jsdom": "^28.1.1",
    "jest-transform-stub": "^2.0.0",
    "msw": "^0.42.0",
    "prettier": "^2.6.2",
    "prettier-eslint": "^15.0.1",
    "react-test-renderer": "^18.1.0",
    "redux-devtools-extension": "^2.13.9",
    "ts-jest": "^28.0.4",
    "typescript": "4.7.3"
  },
  "msw": {
    "workerDirectory": "public"
  }
}
```

**.eslintrc.js**
```js
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
    'testing-library/no-render-in-setup': 0 // actually this is bad - reduces rerendering time for performant tests
  },
}
```

