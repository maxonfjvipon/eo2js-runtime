const object = require('../../../runtime/object')
const at_void = require('../../../runtime/attribute/at-void')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const at_simple = require('../../../runtime/attribute/at-simple');
const dataized = require('../../../runtime/dataized');
const ErFailure = require('../../../runtime/error/ErFailure');
const data = require('../../../runtime/data');

/**
 * Attribute that knows how to memoize an object.
 * @param {Object} [object] - Memoized object
 * @param {Number} [length] - Size
 * @return {Object} - Memoized attribute
 */
const at_memoized = function(object, length) {
  return {
    put: function(obj) {
      const bytes = dataized(obj)
      if (length === undefined) {
        length = bytes.length
      } else if (length < bytes.length) {
        throw new ErFailure(
          `Can't write to memory ${bytes.length} bytes because ${length} were already allocated`
        )
      }
      object = data.toObject(bytes)
    },
    get: function() {
      if (object === undefined) {
        throw new ErFailure(
          `The memory is empty, can't read it`
        )
      }
      return object
    },
    copy: function(_) {
      return at_memoized(object, length)
    }
  }
}

/**
 * Memory.write
 * @param {Object} sigma - Sigma
 * @return {Object} - Memory.write object
 */
const memory$write = function(sigma) {
  const obj = object(sigma, 'memory$write')
  obj.attrs['x'] = at_void('x')
  obj.assets[LAMBDA] = function(self) {
    return self.take(RHO).with({
      'enclosure': self.take('x')
    }).take('enclosure')
  }
  return obj
}

/**
 * Memory.
 * @param {Object} sigma - Sigma
 * @return {Object} - Error object
 */
const memory = function(sigma) {
  const obj = object(sigma, 'memory')
  obj.attrs['enclosure'] = at_memoized()
  obj.attrs['write'] = at_simple(memory$write(obj))
  obj.assets[LAMBDA] = function(self) {
    return self.take('enclosure')
  }
  return obj
}

module.exports = memory
