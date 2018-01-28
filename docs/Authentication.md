# Authentication

Bitbucket uses an Access Token for authentication, using the `OAuth2` protocols

The client app needs to request the Access Token from the server, which has an expiration period.

Access tokens expire in *one hour*. When this happens you’ll get `401` responses

Most *access token grant* responses (Implicit and JWT excluded) therefore include a *refresh token* that can then be used to generate a new *access token*, without the need for end user participation

## OAuth2 end user authorization

The bitbucket API includes the method `authorizeOAuth2`:

```js
apiModel.authorizeOAuth2 = client_id => {
  let parameters = {
    client_id,
    response_type: 'code'
  }
  apiModel.request.get('oauth2/authorize', parameters || {}, requestOptions, callback)
}
```

This can be used for request authorization from the end user, by sending their browser to a page where they must approve access policies (scopes) by the app.

## Access Token authentication

To get the access token, use the `getAccessToken` function by [@tpettersen](https://bitbucket.org/tpettersen/bitbucket-auth-token/).

A sample function `getAccessToken` is available in [bitbucket-auth](https://github.com/kristianmandrup/bitbucket-auth)

```js
import {
  createBitbucketAPI,
} from 'bitbucket-api-v2'

import {
  getAccessToken
} from 'bitbucket-auth'

const config = {
  appName: 'my-app',
  consumerKey: process.env.bitbucketKey,
  consumerSecret: process.env.bitbucketSecret,
  // ... more optional configuration (see getAccessToken function )
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
} from 'bitbucket-api-v2'

// create API instance with accessToken set in header for each request
const api = await createAuthenticatedAPI({
  getAccessToken,
  appName: 'my-app'
})
```
## Browser app authentication flow

To request authorization from the end user, call this uri in the browser app:

`https://bitbucket.org/site/oauth2/authorize?client_id={client_id}&response_type=code`

This will redirecting the browser to `https://bitbucket.org/site/oauth2/authorize` and display an authentication confirmation page, asking the user to approve permissions.

Approval will trigger a call to the callback (route) as configured in the bitbucket OAuth settings for the app (ie. client_id).

The callback includes the `?code={}` query parameter that you can swap for an access token:

```bash
$ curl -X POST -u "client_id:secret" \
  https://bitbucket.org/site/oauth2/access_token \
  -d grant_type=authorization_code -d code={code}
```

`-u "client_id:secret"` is the username

Once you have an access token, as per [RFC-6750](https://tools.ietf.org/html/rfc6749), you can use it in bitbucket requests.
