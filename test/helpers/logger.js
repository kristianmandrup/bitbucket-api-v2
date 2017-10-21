export class Logger {
  constructor(opts = {}) {
    this.opts = opts
    this.logging = opts.logging
    this.reportError = opts.error
  }

  get logLabel() {
    return `${this.constructor.name}:`
  }

  log(...msgs) {
    if (!this.logging) return
    console.log(this.logLabel, ...msgs)
  }

  warn(...msgs) {
    this.log('WARNING:', ...msgs)
  }

  error(msg, value) {
    console.error(this.logLabel, msg, value)
    throw msg
  }
}
