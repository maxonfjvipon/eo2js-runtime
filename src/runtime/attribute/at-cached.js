/**
 * Attribute that caches result after get.
 * @param {object} origin - Original attribute
 * @return {any} - Attribute
 */
const at_cached = function(origin) {
  let cache = null
  return {
    put: function(object) {
      origin.put(object)
    },
    get: function() {
      if (cache == null) {
        cache = origin.get()
      }
      return cache
    },
    copy: function(rho) {
      return at_cached(origin.copy(rho))
    }
  }
}

module.exports = at_cached
