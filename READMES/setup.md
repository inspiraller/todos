# start
npx create-next-app@latest todos-app --typescript --use-npm

# move /pages into /src/pages
rm -rf .next
mkdir src
mv styles src/styles
mv pages src/pages

# add basic react testing library render test
npm i jest ts-jest jest-css-modules-transform jest-transform-stub jest-environment-jsdom react-test-renderer @testing-library/react @types/jest @types/mocha @testing-library/react-hooks eslint-import-resolver-babel-module --save-dev

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
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "src/*"],
}
```
***example:***
- import x from 'src/something'

# mark timestamps
- create css, html, next/boilerplate, listing todos, module resolver - src, dynamic head

# Adding tests
- update eslintrc.json - in order to create custom jest file
```
{
  "extends": ["next/babel","next/core-web-vitals"]
}
```
