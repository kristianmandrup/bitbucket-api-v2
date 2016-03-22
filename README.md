# node-bitbucket-v2
node.js library to access the Bitbucket API v2

## usage
```
const Bitbucket = require('node-bitbucket-v2')
const bitbucketApi = new Bitbucket(); //or: new Bitbucket({useXhr: true})
bitbucketApi.authenticateOAuth2(someAccessToken);
bitbucketApi.user.get((response) => {
  console.log(response.username);
});
```

For implemented methods, check `bitbucket/repositories.js` and `bitbucket/user.js`.
