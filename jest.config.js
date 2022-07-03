module.exports = {
  preset: 'ts-jest',
  // moduleFileExtensions: ["ts", "tsx"],
  // transform: {
  //   "^.+\\.(ts|tsx)$": "ts-jest",
  // },
  testMatch: [
    "**/src/test/**/*.spec.ts",
    // "**/test/**/*.test.ts",
  ],
  testEnvironment: "node",
  setupFiles: ['dotenv/config'],
};
