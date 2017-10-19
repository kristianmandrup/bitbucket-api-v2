const exprMap = {
  get: [/^get/],
  create: [
    /^create/,
    /^add/
  ],
  update: [
    /^update/,
    /^prove/, //approve
    /^vote/,
  ],
  delete: [
    /^delete/,
    /^remove/
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
