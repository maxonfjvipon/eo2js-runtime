const at_cached = require('./attribute/at-cached')

/**
 * Object that caches own attributes.
 * @param {object} object - Object to cache
 * @return {object} - Object with reassigned caching take function
 */
const cached = function(object) {
  Object.keys(object.attrs).forEach((attr) => {
    object.attrs[attr] = at_cached(object.attrs[attr])
  })
  return object
}

module.exports = cached
