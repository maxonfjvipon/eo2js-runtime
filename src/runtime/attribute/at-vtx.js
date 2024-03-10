const at_once = require('./at-once')
const data = require('../data')
const ErFailure = require('../error/ErFailure');
const {RHO, VTX} = require('./specials');

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
        return data.toObject(vtx).with({[RHO]: rho})
      },
      put: function(_) {
        throw new ErFailure(`You can't overwrite ${VTX} attribute`)
      },
      copy: function(_) {
        throw new ErFailure(`You can't explicitly copy ${VTX} attribute`)
      }
    }
  )
}

module.exports = at_vtx
