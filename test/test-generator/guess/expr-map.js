export default {
  get: [/^get/, /^has/, /^is/],
  post: [
    /^create/,
    /^add/,
    /^commit/,
    /^approve/,
    /^stop$/,
    /^merge/,
    /^patch/,
    /^upload/,
  ],
  put: [
    /^update/,
    /^vote/,
    /^watch/,
    /^next/,
  ],
  delete: [
    /^dis/,
    /^delete/,
    /^stop/,
    /^remove/,
    /^decline/
  ]
}
