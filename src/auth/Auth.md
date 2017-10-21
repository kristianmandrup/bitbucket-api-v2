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
