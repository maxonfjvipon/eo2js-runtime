const at_once = require('./at-once')
const vertex = require('../vertex')
const data = require('../data')

/**
 * Vertex attribute.
 * @param {Number} vtx - Optional vertex number
 * @param {Object} rho - Parent
 * @return {Object} - Vertex attribute
 */
const at_vtx = function(vtx, rho) {
  return at_once(
    {
      get: function() {
        return data.toObject(vtx).with({RHO: rho})
      },
      put: function(_) {
        throw new Error(`You can't overwrite vertex`)
      },
      copy: function(_) {
        return at_vtx(vertex.next(), rho)
      }
    }
  )
}

module.exports = at_vtx
