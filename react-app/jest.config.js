/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  roots: ["<rootDir>"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jsdom",
  testRegex: "(\\.(test|spec))\\.[tj]sx?$",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/jest/stub.js",
    "\\.(css|less|scss)$": "<rootDir>/jest/stub.js",
    "^src/(.*)$": "<rootDir>/src/$1",
    "^__tests__/(.*)$": "<rootDir>/__tests__/$1",
  },
  'setupFilesAfterEnv': ['./jest/setup.js'],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "node_modules",
    "<rootDir>/src/store/config/*",
    "<rootDir>/src/pages/_app.tsx",
  ],
  collectCoverageFrom: [
    "<rootDir>/src/*.{ts,tsx}",
    "<rootDir>/src/**/*.{t,j}s{,x}",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 25,
      lines: 100,
      statements: 66,
    },
  },
};
module.exports = createJestConfig(customJestConfig);
