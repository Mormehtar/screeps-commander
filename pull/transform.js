const debug = require('debug')('Commander:Transform');
const path = require('path');

function transform(key, module) {
  const pathChain = key.split('.');

  return {
    name: path.join(...pathChain),
    module: module.replace(/require\(['"](.+)['"]\)/g, (match, reqPath) => {
      let reqChain = reqPath.split('.');
      debug('pathChain', pathChain);
      debug('reqChain', reqChain);
      if (pathChain.length === 1) {
        reqChain.unshift('.');
      } else {
        let tree = [];
        let found = false;
        let index = 0;
        for (let i = 0; i < reqChain; ++i) {
          if (found) { tree.push('..'); }
          else if (reqChain[i] === pathChain[i]) {
            found = true;
            index = i;
          }
        }
        debug('tree', tree);
        debug('found', found);
        debug('index', index);
        if (found) {
          tree = tree.concat(pathChain.slice(index));
        } else {
          tree = pathChain.map(() => '..').concat(reqChain);
        }
        reqChain = tree;
      }
      debug(reqChain);
      let output = path.join(...reqChain);
      if (output[0] !== '.') { output = './' + output; }
      return `require('${output}')`;
    })
  };
}

module.exports = function (params, modules) {
  return Object.keys(modules).map(key => {
    return modules[key] ? transform(key, modules[key]) : null
  })
    .filter(data => !!data)
    .reduce((obj, data) => {
      obj[data.name] = data.module;
      return obj;
    }, {})
};
