# Request customization

Each resource uses `Request` to perform the actual server requests.

## Customize request API

`Request` allows overriding parts of its API so that f.ex the Ajax request library being used can be customized as shown here.

The context of each method in `requestApi` object will be set to the context of the `Request` scope so you have access to all the original variables in that scope (as if each custom API function was defined in there).

```js
opts = {
  requestApi: {
    sendXhrRequest(xhrOptions, done) {
      //... use a custom xhr library to make requests
      done(null, msg)
    }
  }
}

const api = createBitBucketAPI(opts)
```

## Custom request adapter

Alternatively you can substitute your own full adapter (that you can even further customize as described above if needed)

```js
opts = {
  requestAdapter: (opts = {}) {
    // do whatever to return full request API
  },
}
```

Currently only the (original) `xhr` adapter is provided.
There are skeleton implementation for `xhr2` and `request` to be developed and refined by community (see `src/request` folder).

## Select adapter by name

When more working adapters are provided, you can simply specify the option `adapterName` instead to switch adapter.

```js
opts = {
  adapterName: 'xhr2'
}
```

## Full customization scenario (request)

Example scenario replacing `xhr` with `request`:

`xhr` uses the following kind of options:

```js
xhrOptions = {
  headers,
  json: true,
  method,
  timeout: options.timeout * 1000,
  url: `https://${hostname}${path}`
}
```

We can parse the `xhrOptions` and turn them into valid args for `request` to use.
It might look something like this:

```js
function prepareRequestOpts(xhrOptions = {}) {
  let { method, url, json } = xhrOptions
   let requestOpts = {
      url,
      json,
      // ...
  }

  if (xhrOptions.contentType === 'multipart/form-data') {
    requestOpts.formData = json
  }
  if (xhrOptions.contentType === 'multipart/related') {
    requestOpts.multipart = {
      // configure
    }
  }
  // more fiddling ;)
  return requestOpts
}

requestOpts = {
  sendXhrRequest(xhrOptions, done) {
    let { method, url, json } = xhrOptions

    function responseHandler(error, response, body) {
      // return result via done
    }

    // expands on properties of xhr, customize as needed
    let reqOpts = prepareRequestOpts(xhrOptions)
    method = method.toLowerCase()
    request[method](reqOpts, responseHandler)
  }
}

const api = createBitBucketAPI(opts)
```

### Handling multipart

For `multipart/form-data`:

```js
request.post({url:'http://service.com/upload', formData: formData}
```

For `multipart/related`, see [request: multipart/related](https://www.npmjs.com/package/request#multipartrelated)

```js
  request({
    method: 'PUT',
    preambleCRLF: true,
    postambleCRLF: true,
    uri: 'http://service.com/upload',
    multipart: [
      {
        'content-type': 'application/json',
        body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
      },
      { body: 'I am an attachment' },
      { body: fs.createReadStream('image.png') }
    ],
```

## Use in tests

Then in our tests, we can stub/mock `request.get` etc. to give us more fine-grained control.
