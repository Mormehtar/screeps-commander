const debug = require('debug')('Commander:Index');

const pull = require('./pull');
const arguments = require('./paramters');

debug(arguments);

if (arguments.command === 'pull') {
  return pull(arguments);
}
