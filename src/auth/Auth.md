# Access Token authentication

To get the access token, use the `getAccessToken` function (originally by [@tpettersen](https://bitbucket.org/tpettersen/bitbucket-auth-token/))

```js
import {
  createBitbucketAPI,
  getAccessToken
} from 'bitbucket-v2'

const config = {
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
  appName: 'my-app'
})
// create API instance with accessToken set in header for each request
const api = createBitbucketAPI(accessToken)
```

We also expose a `createAuthenticatedAPI` function to encapsulate this commong practice:

```js
import {
  createAuthenticatedAPI,
} from 'bitbucket-v2'

// create API instance with accessToken set in header for each request
const api = await createAuthenticatedAPI({
  appName: 'my-app'
})
```
