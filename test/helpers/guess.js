const exprMap = {
  get: [/^get/, /^has/, /^is/],
  post: [
    /^create/,
    /^add/,
    /^commit/,
    /^approve/,
    /^stop/,
    /^merge/,
    /^patch/,
    /^upload/,
  ],
  put: [
    /^update/,
    /vote/,
  ],
  delete: [
    /^dis/,
    /^delete/,
    /^remove/,
    /^decline/
  ]
}

export function guessRequestType(methodName) {
  let guesses = Object.keys(exprMap).filter(key => {
    let exprs = exprMap[key]
    return exprs.find(expr => expr.test(methodName))
  })
  // return first good guess
  return guesses[0]
}
