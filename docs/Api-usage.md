# Api

## Promise based API

A typical method has the following form:

```js
get(username, repoSlug, callback) {
  const uri = buildUri(username, repoSlug)
  api.get(
    uri,
    null, null,
    result.$createListener(callback)
  )
}
```

The `.promised` api wraps this to return a Promised instead so it can be called as:

```js
get(username, repoSlug).then(result => {
  // ...
})
```

However the `api.get` method it is currently hardcoded to expect a callback as well.

```js
get(apiPath, parameters, options, callback) {
  return result.send(apiPath, parameters, 'GET', options, callback)
}
```

So how do we fix this?

```js
get(apiPath, parameters, options, callback) {
  let send = callback ? result.send : result.sendPromised
  return send(apiPath, parameters, options, callback)
}
```
