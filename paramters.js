const fs = require('fs');
const path = require('path');
const CLI = require('cli');

const params = CLI.parse({
  login: ['l', 'User login', 'string'],
  password: ['p', 'User password', 'string'],
  host: [false, 'Screeps host', 'url', 'screeps.com'],
  port: [false, 'Screeps port', 'int', 443],
  config: [false, 'Path to config file', 'file', './config.json'],
  env: ['e', 'Key to look for configuration in config file.', 'string' ,''],
  source: ['s', 'Path to directory with sources', 'directory', './src'],
  command: ['c', 'Command to run (pull or push)', 'string'],
  branch: ['b', 'Branch for command', 'string', 'sim']
});

if (!params.env) { params.env = false; }

const configPath = path.resolve(params.config);
if (fs.existsSync(configPath)) {
  const config = require(configPath);
  if (params.env) {
    Object.assign(params, config[params.env]);
  } else {
    Object.assign(params, config);
  }
}

params.source = path.resolve(params.source);

if (params.command !== 'pull' && params.command !== 'push') {
  throw new Error(`Unknown command ${params.command}`);
}

if (!params.login || !params.password) {
  throw new Error('No credentials');
}

module.exports = params;
