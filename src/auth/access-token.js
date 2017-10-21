const homeDir = require('home-dir')
const jsonfile = require('jsonfile')
const request = require('superagent')
let {
  errorHandler,
  createValidator,
  defaults
} = require('./util')

/**
 *
 * Retrieve access token from server
 * uses Basic Auth (username/password) POST request
 *
 * @param {String} appName Name of app
 * @param {String} consumerKey Auth username
 * @param {String} consumerSecret Auth password
 * @param {String} refreshToken (optional)
 * @param {Boolean} forceCredentials To force re-retrieval of token credentials (optional)
 * @param {String} logger To log messages (optional)
 * @param {Function} credentialsProvider Custom credentials provider function (optional)
 * @param {Function} errorHandler To handle any error (optional)
 */
function getAccessToken(opts = {}) {
  errorHandler = setErrorHandler(opts)
  createValidator('getAccessToken').validateOpts(opts)

  // set default path for storing config
  const configPath = homeDir('/.' + opts.appName)
  const logger = opts.logger || defaults.logger
  let config
  try {
    config = jsonfile.readFileSync(configPath)
  } catch (e) {
    config = {}
  }
  opts = Object.assign({}, {
    configPath,
    config,
    logger,
    domain: 'bitbucket.org'
  }, opts)

  const {
    refreshToken,
    forceCredentials,
    credentialsProvider
  } = config

  if (refreshToken && !forceCredentials) {
    opts.refreshToken = refreshToken
    return getTokens(opts)
  } else if (credentialsProvider) {
    return credentialsProvider().then(function (credentials) {
      opts = Object.assign(opts, credentials)
      return getTokens(opts)
    })
  } else {
    errorHandler('opts must specify a credentialsProvider')
  }
}

/**
 *
 * Retrieve access token from server
 * uses Basic Auth (username/password) POST request
 *
 * @param {String} consumerKey (username)
 * @param {String} consumerSecret (password)
 * @param {String} refreshToken
 * @param {String} domain On bitbucket
 * @param {String} logger To log messages
 * @param {Object} config Configuration
 * @param {String} configPath Path to store configuration
 */
function getTokens(opts = {}) {
  let payload
  const errorMessageOn401 = 'Authentication failed!'
  // TODO: potentially add options validation here as well
  const {
    username,
    password,
    refreshToken,
    consumerKey,
    consumerSecret,
    domain,
    configPath,
    config,
    logger
  } = opts

  if (username) {
    payload = {
      grant_type: 'password',
      username,
      password
    }
    errorMessageOn401 += ' Bad username/password?'
  } else if (refreshToken) {
    payload = {
      grant_type: 'refresh_token',
      refresh_token
    }
    errorMessageOn401 += ' Bad refresh token?'
  } else {
    errorHandler('opts must specify either username and password, or refreshToken')
  }

  return new Promise(function (resolve, reject) {
    const uri = `https://${domain}/site/oauth2/access_token`
    request
      .post(uri)
      .auth(consumerKey, consumerSecret)
      .accept('application/json')
      .type('form')
      .send(payload)
      .end(function (err, res) {
        if (res && res.ok) {
          var newConfig = Object.assign(config, {
            refreshToken: res.body.refresh_token
          })
          jsonfile.writeFile(configPath, newConfig, {
            mode: 600
          }, function () {
            // log a message if we're using the password flow to retrieve a token
            if (username) {
              logger('storing auth token in ' + configPath)
            }
          })
          resolve(res.body.access_token)
        } else {
          var errorMessage
          if (res && res.status === 401) {
            errorMessage = errorMessageOn401
          } else if (err) {
            errorMessage = err
          } else {
            errorMessage = res.text
          }
          reject(errorMessage)
        }
      })
  })
}

module.exports = {
  getAccessToken: getAccessToken
}
