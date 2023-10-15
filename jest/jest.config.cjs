const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '.'),
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env']
      }
    ]
  },
  testMatch: ['**/__tests__/*.{,test}.{ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  automock: false,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text'],
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  setupFilesAfterEnv: ['./jest.setup.cjs'],
  globals: {
    NODE_ENV: 'test'
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'ts', 'node']
};
