const debug = require('debug')('Commander:Pull');
const pull = require('./pull');
const save = require('./save');
const transform = require('./transform');

module.exports = function (params) {
  debug('Pull');
  return pull(params)
    .then(result => transform(params, result))
    .then(result => save(params, result))
    .catch(err => console.error(err))
    .then(() => console.log('Finished!'));
};