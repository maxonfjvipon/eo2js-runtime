/**
 * Simple attribute that just returns given object.
 * @param {object} object - Object ot return
 * @return {any} - Simple attribute
 */
const at_simple = function(object) {
  let obj = object
  return {
    put: function(object) {
      obj = object
    },
    get: function() {
      return obj
    },
    copy: function(_) {
      return at_simple(obj.copy())
    }
  }
}

module.exports = at_simple
