/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'adonis-jest',
  setupFilesAfterEnv: ['./jest.setup.redis-mock.js'],
}
