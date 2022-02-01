export default {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest-setup.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|ico)$': '<rootDir>/config/jest-mock.ts',
    '^@/(.*)$': '<rootDir>/src/$1' // for paths alias
  },
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
