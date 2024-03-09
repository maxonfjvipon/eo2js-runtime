const once = require('./at-once')
const simple = require('./at-simple')
const free = require('./at-void')
const lambda = require('./at-lambda')
const fixed = require('./at-fixed')
const vtx = require('./at-vtx')
const safe = require('./at-safe')

const attr = {
  once,
  simple,
  void: free,
  safe,
  lambda,
  fixed,
  vtx
}

module.exports = attr
