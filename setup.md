# start
npx create-next-app@latest todos-app --typescript --use-npm

# move /pages into /src/pages
rm -rf .next
mv styles src/styles
mv pages src/pages

# add basic react testing library render test
npm i jest ts-jest jest-css-modules-transform jest-transform-stub jest-environment-jsdom react-test-renderer @testing-library/react @types/jest @types/mocha @testing-library/react-hooks eslint-import-resolver-babel-module --save-dev
