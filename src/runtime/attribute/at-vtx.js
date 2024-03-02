const at_once = require('./at-once')
const vertex = require('../vertex')
const data = require('../data')

/**
 * Vertex attribute.
 * @param {Number} [vtx] - Optional vertex number
 * @return {Object} - Vertex attribute
 */
const at_vtx = function(vtx) {
  vtx = vtx || vertex.next()
  return at_once(
    {
      get: function() {
        return data.toObject(vtx)
      },
      put: function(_) {
        throw new Error(`You can't overwrite vertex`)
      },
      copy: function(_) {
        return at_vtx()
      }
    }
  )
}

module.exports = at_vtx
