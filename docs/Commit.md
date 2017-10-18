### Commits

Commit API is now available [as noted here](https://community.atlassian.com/t5/Bitbucket-questions/Do-you-having-an-API-to-push-the-content-to-BitBucket-Repo/qaq-p/15318#M17395
)

See [repo slug POST](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/src#post) for details

#### multipart/form-data

Use `multipart/form-data` when we need to upload a file:

```html
<form action="/update" method="post" encrypt="multipart/form-data>
  <input type="text" name="username" />
  <input type="file" name="avatar" />
  <button type="submit" />
</form>
```

Current implementation in repositories:

```js
/**
 * Commit files to a user repo
 *
 * @param {String} repo owner
 * @param {String} slug (name) of the repo.
 * @param {Object} files to commit, each key is file
 * @param {Object} options to control request send such as the contentType
 *
 * File content can be either textual/binary (for multipart/form-data)
 * or a path to a file on disk
 * Can also be called: commit(username, repoSlug, files, callback)
 */
commit(username, repoSlug, params, options, callback) {
  const uri = buildUri(username, repoSlug);
  if (typeof options === 'function') {
    callback = options;
    options = null;
  }
  api.post(
    uri,
    params, options || {
      contentType: 'multipart/form-data'
    },
    result.$createListener(callback)
  );
}
```

Note that we are sending the files as the data argument and passing `contentType: 'multipart/form-data'` in options to force override of default `content-type` normally set to `application/json` for `Request.send`.

### Commit example

```js
let commit = {
  message: 'nice refactoring',
  author: 'Erik van Zijst <erik.van.zijst@gmail.com>',
  branch: 'develop',
  files: {
    'docs/hello.txt': 'hello sweet world',
    'docs/bye.txt': 'Goodbye cruel world',
    'Readme.txt': '# Intro'
  }
}
let project = repositories.forProject(username, repo)
await project.create()
await project.commit(commit)
```

Note: Has not yet been tested!

#### application/x-www-form-urlencoded

It is also possible to upload new files using a simple `application/x-www-form-urlencoded` POST. This can be convenient when uploading pure text files:

```txt
$ curl https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/ \
  --data-urlencode "/path/to/me.txt=Lorem ipsum." \
  --data-urlencode "message=Initial commit" \
  --data-urlencode "author=Erik van Zijst <erik.van.zijst@gmail.com>"
```

### Conflicting meta data

There could be a field name clash if a client were to upload a file named "message", as this filename clashes with the meta data property for the commit message. To avoid this and to upload files whose names clash with the meta data properties, use a leading slash for the files, e.g. `curl --data-urlencode "/message=file contents"`.
