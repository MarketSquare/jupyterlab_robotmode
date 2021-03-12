// See
// https://jupyterlab.readthedocs.io/en/stable/developer/extension_dev.html#testing-your-extension
// https://github.com/jupyterlab/jupyterlab-git/

module.exports = {
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/testutils/jest-file-mock.js',
  },
  setupFiles: ['<rootDir>/testutils/jest-setup-files.js'],
  preset: 'ts-jest',
  verbose: true,
  collectCoverage: true,
  clearMocks: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(@jupyterlab/.*)/)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/lib/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
