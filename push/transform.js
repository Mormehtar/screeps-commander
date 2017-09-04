const debug = require('debug')('Commander:Push:Transform');
const path = require('path');

module.exports = function (params, modules) {
  return Object.keys(modules).map(key => {
    const parsed = path.parse(key);
    const keyChain = parsed.dir.split(path.sep);
    debug('keyChain', keyChain);
    const output = modules[key].replace(/require\s*\(\s*['"](.+)['"]\s*\)/g, (match, reqPath) => {
      debug(match, reqPath);
      const reqChain = path.join(reqPath).split(path.sep);
      debug(reqChain);
      let index = keyChain.length;
      while (reqChain[0] === '..') {
        reqChain.shift();
        --index;
      }
      const tree = keyChain.slice(0, index).concat(reqChain).filter(str => !!str);
      return `require('${tree.join('.')}')`;
    });

    return { name: (parsed.name === 'index' ? keyChain : keyChain.concat(parsed.name)).filter(str => !!str).join('.'), module: output };
  })
    .reduce((obj, element) => {
      obj[element.name] = element.module;
      return obj;
    }, {});
};