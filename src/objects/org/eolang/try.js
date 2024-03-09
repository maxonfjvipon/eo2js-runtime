const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const at_void = require('../../../runtime/attribute/at-void')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const ErError = require('../../../runtime/error/ErError');

/**
 * Try.
 * @param {Object} sigma - Sigma
 * @return {Object} - Try object
 */
const _try = function(sigma) {
  const obj = object(sigma, 'try')
  obj.attrs['main'] = at_void('main')
  obj.attrs['catch'] = at_void('catch')
  obj.attrs['finally'] = at_void('finally')
  obj.assets[LAMBDA] = function(self) {
    const body = self.take('main').copy().with({[RHO]: self})
    let ret
    try {
      ret = body
      dataized(body)
    } catch (error) {
      if (error instanceof ErError) {
        ret = self.take('catch').copy().with({
          [RHO]: self,
          0: error.enclosure
        })
      } else {
        throw error
      }
    } finally {
      dataized(self.take('finally').copy().with({[RHO]: self}))
    }
    return ret
  }
  return obj
}

module.exports = _try
