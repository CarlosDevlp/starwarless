module.exports = {
    preset: 'ts-jest',  // To use Jest with TypeScript
    testEnvironment: 'node',  // The environment for testing
    moduleFileExtensions: ['ts', 'js'],  // Specify the file types for testing
    testMatch: ['**/test/**/*.test.ts'],  // Look for test files in the test/ folder
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
};  