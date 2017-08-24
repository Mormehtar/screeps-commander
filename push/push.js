const debug = require('debug')('Commander:Push:Push');
const https = require('https');
const Promise = require('bluebird');

module.exports = function (params, modules) {
  const data = {
    branch: params.branch,
    modules: modules
  };

  let res;
  let rej;
  const answer = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  const req = https.request({
    hostname: params.host,
    port: params.port,
    path: '/api/user/code',
    method: 'POST',
    auth: params.login + ':' + params.password,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }, (result) => {
    debug(`Code: ${result.statusCode}`);
    debug(`Headers: ${JSON.stringify(result.headers)}`);

    if (result.statusCode === 200) {
      res();
    } else {
      rej(result);
    }
  });

  req.write(JSON.stringify(data));
  req.end();


  return answer;
};
