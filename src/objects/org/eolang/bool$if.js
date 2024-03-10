const object = require('../../../runtime/object')
const at_void = require('../../../runtime/attribute/at-void')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const dataized = require('../../../runtime/dataized');
const {BOOL} = require('../../../runtime/data')

/**
 * Bool.if.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bool.if object
 */
const bool$if = function(sigma) {
  const obj = object(sigma, 'bool$if')
  obj.attrs['t'] = at_void('t')
  obj.attrs['f'] = at_void('f')
  obj.assets[LAMBDA] = function(self) {
    let ret
    if (dataized(self.take(RHO), BOOL)) {
      ret = self.take('t')
    } else {
      ret = self.take('f')
    }
    return ret
  }
  return obj
}

module.exports = bool$if
