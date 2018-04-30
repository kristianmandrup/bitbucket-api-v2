const _ = require('lodash')
const https = require('https')
const querystring = require('querystring')
const url = require('url')
const xhr = require('xhr')

const {
  defaults,
  promisify,
  createPromisedApi,
  switchEachFunctionContext
} = require('./util')

/**
 * Performs requests on GitHub API.
 */
module.exports = function XhrAdapter(_options) {
  const $defaults = defaults
  const $options = _.defaults({}, _options, $defaults)

  let requestApi = _options.requestApi || {}
  let customRequestApi = switchEachFunctionContext(requestApi, this)

  const result = {
    $defaults,
    $options
  }

  function log(...msgs) {
    if ($options.logging) {
      console.log(...msgs)
    }
  }

  let localApi = _.assign({
    name: 'Request',
    /**
     * Change an option value.
     *
     * @param {String} name   The option name
     * @param {Object} value  The value
     *
     * @return {Request} The current object instance
     */
    setOption(name, value) {
      $options[name] = value
      return result
    },

    /**
     * Get an option value.
     *
     * @param  string $name The option name
     *
     * @return mixed  The option value
     */
    getOption(name, _defaultValue) {
      const defaultValue = _defaultValue === undefined ? null : _defaultValue
      return $options[name] ? $options[name] : defaultValue
    },

    /**
     * Send a GET request
     * @see send
     */
    get(apiPath, parameters, options, callback) {
      let send = callback ? result.send : result.sendPromised
      return send(apiPath, parameters, 'GET', options, callback)
    },

    /**
     * Send a POST request
     * @see send
     */
    post(apiPath, parameters, options, callback) {
      let send = callback ? result.send : result.sendPromised
      return send(apiPath, parameters, 'POST', options, callback)
    },

    /**
     * Send a POST multiForm/form-data request
     * @see send
     */
    postForm(apiPath, parameters, options, callback) {
      options = options || {}
      options.contentType = 'multipart/form-data'
      let send = callback ? result.send : result.sendPromised
      return send(apiPath, parameters, 'POST', options, callback)
    },

    /**
     * Send a POST multiForm/related request
     * @see send
     */
    postRelated(apiPath, parameters, options, callback) {
      options = options || {}
      options.contentType = 'multipart/related'
      let send = callback ? result.send : result.sendPromised
      return send(apiPath, parameters, 'POST', options, callback)
    },

    /**
     * Send a DELETE request
     * @see send
     */
    delete(apiPath, parameters, options, callback) {
      let send = callback ? result.send : result.sendPromised
      return send(apiPath, parameters, 'DELETE', options, callback)
    },

    /**
     * Send a PUT request
     * @see send
     */
    put(apiPath, parameters, options, callback) {
      let send = callback ? result.send : result.sendPromised
      return send(apiPath, parameters, 'PUT', options, callback)
    },

    /**
     * Send a PUT request using multipart/related
     * @see send
     */
    putRelated(apiPath, parameters, options = {}, callback) {
      options = options || {}
      options.contentType = 'multipart/related'
      let send = callback ? result.send : result.sendPromised
      return send(apiPath, parameters, 'PUT', options, callback)
    },

    /**
     * Send a PUT request using multipart/form
     * @see send
     */
    putForm(apiPath, parameters, options, callback) {
      options = options || {}
      options.contentType = 'multipart/form-data'
      let send = callback ? result.send : result.sendPromised
      return send(apiPath, parameters, 'PUT', options, callback)
    },

    /**
     * Send a request to the server, receive a response,
     * decode the response and returns an associative array
     *
     * @param  {String}    apiPath        Request API path
     * @param  {Object}    parameters     Parameters
     * @param  {String}    httpMethod     HTTP method to use
     * @param  {Object}    options        reconfigure the request for this call only
     */
    send(apiPath, parameters, httpMethod = 'GET', __options, callback) {
      // merge specific options on top of default $options
      const options = Object.assign($options, __options || {})
      result.doSend(apiPath, parameters, httpMethod, options, (err, _response) => {
        if (err) {
          if (callback) {
            callback(err)
          }
          return
        }

        const response = options.use_xhr ? _response : result.decodeResponse(_response)
        if (callback) {
          callback(null, response)
        }
      })
    },

    async sendPromised(apiPath, parameters, httpMethod = 'GET', __options) {
      const options = __options || $options
      try {
        let promisedDoSend = promisify(result.doSend)
        let _response = await promisedDoSend(apiPath, parameters, httpMethod, options)
        const response = options.use_xhr ? _response : result.decodeResponse(_response)
        return response
      } catch (err) {
        return err
      }
    },

    /**
     * Send a request to the server using a URL received from the API directly, receive a response
     *
     * @param {String}   $prebuiltURL       Request URL given by a previous API call
     */
    doPrebuiltSend(prebuiltURL, callback) {
      const {
        headers,
        port
      } = result.prepRequest($options)

      let called = false

      function done(err, body) {
        if (called) {
          return
        }

        called = true
        callback(err, body)
      }

      if ($options.use_xhr) {
        const xhrOptions = {
          headers,
          json: true,
          timeout: $options.timeout * 1000,
          url: prebuiltURL
        }

        result.sendXhrRequest(xhrOptions, done)
        return
      }

      const {
        hostname,
        path
      } = url.parse(prebuiltURL)
      const httpsOptions = {
        headers,
        hostname,
        method: 'GET',
        path,
        post: port
      }
      log('doPrebuiltSend', {
        httpsOptions
      })

      result.sendHttpsRequest(httpsOptions, undefined, done)
    },

    /**
     * Send a request to the server, receive a response
     *
     * @param {String}   $apiPath       Request API path
     * @param {Object}    $parameters    Parameters
     * @param {String}   $httpMethod    HTTP method to use
     */
    doSend(apiPath, parameters, _httpMethod, options, callback) {
      const method = _httpMethod.toUpperCase()
      const {
        headers,
        hostname,
        port
      } = result.prepRequest(options)

      let query
      let path = options.path + '/' + apiPath.replace(/\/*$/, '') // eslint-disable-line prefer-template
      if (method === 'POST') {
        query = JSON.stringify(parameters)
        headers['Content-Type'] = options.contentType || 'application/json'
        if (!options.use_xhr) {
          headers['Content-Length'] = query.length
        }
      } else {
        query = querystring.stringify(parameters)
        path += `?${query}`
      }

      let called = false

      function done(err, body) {
        if (called) {
          return
        }

        called = true
        callback(err, body)
      }

      if (options.use_xhr) {
        const xhrOptions = {
          headers,
          json: true,
          method,
          timeout: options.timeout * 1000,
          url: `https://${hostname}${path}`
        }
        if (method === 'POST') {
          xhrOptions.json = parameters
        }
        log('doSend', {
          xhrOptions
        })
        result.sendXhrRequest(xhrOptions, done)
        return
      }

      const httpsOptions = {
        headers,
        hostname,
        method,
        path,
        post: port
      }
      log('doSend', {
        httpsOptions
      })
      result.sendHttpsRequest(httpsOptions, query, done)
    },

    /**
     * Get a JSON response and transform to JSON
     */
    decodeResponse(response) {
      if ($options.format === 'json' && typeof response == 'string') {
        return JSON.parse(response)
      }

      return response
    },

    prepRequest(options) {
      const {
        hostname: _hostname,
        http_port: httpPort,
        oauth_access_token: oauthAccessToken,
        jwt_access_token: jwtAccessToken,
        username: _user,
        password: _pass,
        proxy_host: proxyHost,
        proxy_port: proxyPort,
        use_xhr: useXhr
      } = options
      const hostname = !useXhr && proxyHost ? proxyHost : _hostname
      const port = !useXhr && proxyHost ? proxyPort || 3128 : httpPort || 443

      // console.log('prepRequest', options)
      const authBearerToken = oauthAccessToken || jwtAccessToken || null
      const basicAuthToken = _user && _pass ?
        Buffer.from(`${_user}:${_pass}`).toString('base64') : null

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: '<none>'
      }

      if (basicAuthToken) headers.Authorization = `Basic ${basicAuthToken}`
      else if (authBearerToken) headers.Authorization = `Bearer ${authBearerToken}`

      if (!useXhr) {
        headers['Host'] = 'api.bitbucket.org' // eslint-disable-line dot-notation
        headers['User-Agent'] = 'NodeJS HTTP Client'
        headers['Content-Length'] = '0'
      }

      return {
        headers,
        hostname,
        port
      }
    },

    sendHttpsRequest(httpsOptions, query, done) {
      log('sendHttpsRequest', {
        httpsOptions,
        query
      })
      const request = https.request(httpsOptions, response => {
        response.setEncoding('utf8')

        const body = []
        response.addListener('data', chunk => {
          body.push(chunk)
        })

        function isJsonResponse() {
          return response.headers['content-type'].includes('application/json')
        }

        response.addListener('end', () => {
          let msg = body.join('')

          if (response.statusCode > 204) {
            if (isJsonResponse()) {
              msg = JSON.parse(msg)
            }
            done({
              status: response.statusCode,
              msg
            })
            return
          }
          if (response.statusCode === 204) {
            msg = {}
          } else {
            msg = result.decodeResponse(msg)
          }

          done(null, msg)
        })

        response.addListener('error', e => {
          done(e)
        })

        response.addListener('timeout', () => {
          done(new Error('Request timed out'))
        })
      })

      request.on('error', e => {
        done(e)
      })

      if (httpsOptions.method === 'POST') {
        request.write(query)
      }

      request.end()
    },

    sendXhrRequest(xhrOptions, done) {
      log('sendXhrRequest', xhrOptions)
      xhr(xhrOptions, (error, response) => {
        if (error) {
          done(error)
          return
        }
        let msg = response.body

        if (response.statusCode > 204) {
          done({
            status: response.statusCode,
            msg
          })
          return
        }
        if (response.statusCode === 204) {
          msg = {}
        }

        done(null, msg)
      })
    }
  }, customRequestApi)

  localApi.promised = createPromisedApi(localApi, $options)
  return _.assign(result, localApi)
}
