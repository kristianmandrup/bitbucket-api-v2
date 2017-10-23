# Access Token authentication

To get the access token, use the `getAccessToken` function (originally by [@tpettersen](https://bitbucket.org/tpettersen/bitbucket-auth-token/))

You can supply a `loadConfig` function that loads configuration as you see fit, such as from `localstorage` (in browser client) or from a `.json` file on the server.

```js
const homeDir = require('home-dir')
const jsonfile = require('jsonfile')

loadConfig(opts) {
  // set default path for storing config
  const configPath = homeDir('/.' + opts.appName)
  let config
  try {
    config = jsonfile.readFileSync(configPath)
  } catch (e) {
    config = {}
  }
  return config
}
```

If you supply a `loadConfig` function you would normally provide a `saveConfig` method as well.

```js
saveConfig(newConfig, opts = {}) {
  const { configPath, username, logger } = opts
  jsonfile.writeFile(configPath, newConfig, {
    mode: 600
  }, function () {
    // log a message if we're using the password flow to retrieve a token
    if (username) {
      logger('storing auth token in ' + configPath)
    }
  })
}
```

Full example:

```js
import {
  createBitbucketAPI,
  getAccessToken
} from 'bitbucket-api-v2'

const config = {
  loadConfig,
  saveConfig,
  appName: 'my-app',
  consumerKey: process.env.bitbucketKey,
  consumerSecret: process.env.bitbucketSecret,
  // ... more configuration (see function getAccessToken)
}

const accessToken = await getAccessToken(config)

// create API instance with accessToken set in header for each request
const api = createBitbucketAPI(accessToken)
```

`getAccessToken` will try to read the `consumerKey` and `consumerSecret` from the above listed environment variables if they are not passed as arguments.

If you follow this best practice, you can simplify it to:

```js
const accessToken = await getAccessToken({
  appName: 'my-app',
  loadConfig,
  saveConfig
})
// create API instance with accessToken set in header for each request
const api = createBitbucketAPI(accessToken)
```

We also expose a `createAuthenticatedAPI` function to encapsulate this commong practice:

```js
import {
  createAuthenticatedAPI,
} from 'bitbucket-api-v2'

// create API instance with accessToken set in header for each request
const api = await createAuthenticatedAPI({
  appName: 'my-app'
})
```
