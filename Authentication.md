# Authentication

## Test cases

The `authorize.test.js` file contains tests for each of the authrozation routes and primary authentication protocols available for bitbucket API access.

`$ ava test/auth/authorize.test.js`

The request testing is done via [supertest](https://github.com/visionmedia/supertest)

## OAuth2 Auth flow

Request authorization from the end user by sending their browser to:

`https://bitbucket.org/site/oauth2/authorize?client_id={client_id}&response_type=code`

The callback includes the `?code={}` query parameter that you can swap for an access token:

```bash
$ curl -X POST -u "client_id:secret" \
  https://bitbucket.org/site/oauth2/access_token \
  -d grant_type=authorization_code -d code={code}
```

`-u "client_id:secret"` is the username

Once you have an access token, as per [RFC-6750](https://tools.ietf.org/html/rfc6749), you can use it in a request

### Authorize

An authorize request has the following form:

`https://bitbucket.org/site/oauth2/authorize?client_id=XXXYYY&response_type=code`

Test via terminal:

CLI: `$ curl https://bitbucket.org/site/oauth2/authorize?client_id=XXXYYY&response_type=code`

Rewritten for supertest:

```js
let result = await connection
  .get('/site/oauth2/authorize')
  .query({
    client_id: 'z9D3A3XrNFPjPwh9zx',
    response_type: 'code'
  })
  .expect(302)
```

It responds with Found 302 and a pretty non-sensical response.
Not sure if we should expect it to call out server callback at this point, but doesn't seem to be the case?

### Access token

What is this POST request for exactly. Would seem to post the code to the server, but what exactly is this code?

```bash
$ curl -X POST -u "client_id:secret" https://bitbucket.org/site/oauth2/access_token \
-d grant_type=authorization_code -d code={code}
```

