var request = require('request').defaults({maxRedirects:20, followAllRedirects: true, followOriginalHttpMethod: true, followRedirect: true});
var Promise = Promise || require('es6-promise').Promise;
var isOk = require('is-ok');

var HTTPError = require('./error').HTTPError;
var buildDetailUrl = require('./build-detail-url');
var mergeConfig = require('./merge-config');
var defaultConfig = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  },
  qs: {
    hl: 'en',
    gl: 'US'
  }
};

function get (identifier, userConfig) {
  return new Promise(function (resolve, reject) {
    var config = mergeConfig(buildDetailUrl(identifier), defaultConfig, userConfig);
    request(config, function (error, response, body) {
      if (error) {
        reject(error);
        return;
      }
      if (!isOk(response)) {
        reject(new HTTPError(response.statusCode));
        return;
      }
      resolve(body);
    });
  });
}

module.exports = get;
module.exports.defaultConfig = defaultConfig;
