const fs = require('fs');
const CLI = require('cli');

const params = CLI.parse({
  login: ['l', 'User login', 'string'],
  password: ['p', 'User password', 'string'],
  host: ['h', 'Screeps host', 'url', 'https://screeps.com'],
  config: [false, 'Path to config file', 'file', './config.json'],
  env: ['e', 'Key to look for configuration in config file.', 'string' ,''],
  source: ['s', 'Path to directory with sources', 'directory', './src'],
  command: ['c', 'Command to run', 'string']
});

if (!params.env) { params.env = false; }

if (fs.existsSync(params.config)) {
  const config = require(params.config);
  if (params.env) {
    Object.assign(params, config[params.env]);
  } else {
    Object.assign(params, config);
  }
}

module.exports = params;
