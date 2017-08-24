const debug = require('debug')('Commander:Index');

const pull = require('./pull');
const push = require('./push');
const arguments = require('./paramters');

debug(arguments);

switch (arguments.command) {
  case 'pull': return pull(arguments);
  case 'push': return push(arguments);
}
