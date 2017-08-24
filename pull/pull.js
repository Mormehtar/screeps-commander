const debug = require('debug')('Commander:Pull');
const https = require('https');
const Promise = require('bluebird');

module.exports = function (params) {

  let res, rej;
  const answer = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  function clean(result) {
    debug(`Code: ${result.statusCode}`);
    debug(`Headers: ${JSON.stringify(result.headers)}`);

    let output = '';

    result.on('data', (data) => {
      output += data;
    });

    result.on('end', () => {
      const final = JSON.parse(output);
      if (final.ok !== 1) {
        return rej(new Error(`Answer is ${final.ok}`));
      }
      if (final.branch !== params.branch) {
        return rej(new Error(`Returned branch ${final.branch} not ${params.branch}`));
      }
      res(final.modules);
    });

    result.on('error', (error) => {
      rej(error);
    });
  }
  
  const request = https.request({
    hostname: params.host,
    port: params.port,
    path: `/api/user/code?branch=${params.branch}`,
    method: 'GET',
    auth: params.login + ':' + params.password
  }, clean);

  request.on('error', (error) => {
    rej(error);
  });

  request.end();

  return answer;
};
