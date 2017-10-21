export class Logger {
  constructor(opts = {}) {
    this.logging = opts.logging
  }

  get logLabel() {
    return this.constructor.name
  }

  log(...msgs) {
    if (!this.logging) return
    console.log(this.logLabel, ...msgs)
  }

  error(msg, value) {
    if (!this.logging) return
    console.error(this.logLabel, msg, value)
    throw new Error(msg)
  }
}
