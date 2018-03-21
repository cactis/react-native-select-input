const path = require('path');
const glob = require('glob-to-regexp');
const blacklist = require('metro-bundler/src/blacklist');
const pkg = require('../package.json');

module.exports = {
  getProjectRoots() {
    return [__dirname, path.resolve(__dirname, '..')];
  },
  getProvidesModuleNodeModules() {
    return Object.keys(pkg.peerDependencies);
  },
  getBlacklistRE() {
    return blacklist([
      glob(`${path.resolve(__dirname, '..')}/node_modules/*`),
    ]);
  },
};