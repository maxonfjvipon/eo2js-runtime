/**
 * Object that caches own attributes.
 * @param {object} object - Object to cache
 * @return {object} - Object with reassigned caching take function
 */
const cached = function(object) {
  const cache = {}
  const ref = {...object}
  object.take = function(attr) {
    if (!cache[attr]) {
      cache[attr] = ref.take(attr)
    }
    return cache[attr]
  }
  return object
}

module.exports = cached
