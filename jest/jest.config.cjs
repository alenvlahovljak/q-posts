const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env']
      }
    ]
  },
  testMatch: ['<rootDir>/src/**/__tests__/*.{,test}.{ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/jest/__mocks__/styleMock.js'
  },
  automock: false,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text'],
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  setupFilesAfterEnv: ['./jest/jest.setup.js'],
  globals: {
    NODE_ENV: 'test'
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['tsx', 'js', 'ts', 'node']
};
