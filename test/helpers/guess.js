const exprMap = {
  get: [/^get/],
  post: [
    /^create/,
    /^add/,
    /^commit/
  ],
  put: [
    /^update/,
    /pprove/, //approve
    /vote/,
  ],
  delete: [
    /^delete/,
    /^remove/,
    /^decline/,
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
