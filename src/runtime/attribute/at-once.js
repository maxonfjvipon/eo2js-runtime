/**
 * Attribute that is read only once.
 * @param {object} origin - Original attribute
 * @return {any} - Attribute
 */
const at_once = function(origin) {
  let cache = null
  return {
    put: function(_) {
      throw new Error(`You can't overwrite ${origin}`)
    },
    get: function() {
      if (!cache) {
        cache = origin.get()
      }
      return cache
    },
    copy: function(object) {
      return at_once(origin.copy(object))
    }
  }
}

module.exports = at_once
