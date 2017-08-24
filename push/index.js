const debug = require('debug')('Commander:Push');
const Promise = require('bluebird');

const getModules = require('./getModules');
const transform = require('./transform');
const push = require('./push');

module.exports = function (params) {
  debug('Push');
  return Promise.resolve(getModules(params))
    .then(modules => transform(params, modules))
    .then(modules => push(params, modules))
    .catch(err => console.error(err))
    .then(() => console.log('Finished!'));
};