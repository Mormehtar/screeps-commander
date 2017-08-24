const debug = require('debug')('Commander:Pull:Save');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

module.exports = function(params, modules) {

  rimraf.sync(params.source);
  Object.keys(modules).forEach(key => {
    const fullPath = path.join(params.source, key) + '.js';
    const dir = path.parse(fullPath).dir;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(fullPath, modules[key])
  });
};