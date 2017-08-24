const pull = require('./pull');
const save = require('./save');
const transform = require('./transform');

module.exports = function (params) {
  return pull(params)
    .then(result => transform(params, result))
    .then(result => save(params, result))
    .catch(err => console.error(err));
};