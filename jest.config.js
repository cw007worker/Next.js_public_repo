/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://kulshekhar.github.io/ts-jest/docs/getting-started/options
 */

module.exports = {
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
    },
  },
  moduleDirectories: ['node_modules', 'src'],
};
