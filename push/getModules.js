const fs = require('fs');
const path = require('path');

function fillModules(key, prefix='.', modules={}) {
  fs.readdirSync(key).forEach(fileName => {
    const fullName = path.join(key, fileName);
    const stat = fs.statSync(fullName);
    if (stat.isFile()) {
      modules[path.join(prefix, fileName)] = fs.readFileSync(fullName, { encoding: 'utf8'});
    } else {
      return fillModules(fullName, path.join(prefix, fileName), modules);
    }
  });
  return modules;
}

module.exports = function (params) {
  return fillModules(params.source);
};