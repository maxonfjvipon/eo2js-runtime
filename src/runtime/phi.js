const pckg = require('./package')
const vertex = require('./vertex')
const {VTX, PHI, RHO, SIGMA} = require('./attribute/specials')
const at_vtx = require('./attribute/at-vtx')

/**
 * Vertex of global object scope.
 * @type {number}
 */
const vtx = vertex.next()

/**
 * Name of phi.
 * @type {string}
 */
const NAME = 'Φ'

/**
 * The global scope object, which owns all other objects.
 * @type {any}
 */
const phi = {
  attrs: {
    [VTX]: at_vtx(vtx),
  },
  assets: {},
  with: function(_) {
    return phi
  },
  take: function(name) {
    if ([PHI, SIGMA, RHO].includes(name)) {
      throw new Error(`Can't take ${name} attribute from ${NAME} object`)
    }
    let object
    if (name === VTX) {
      object = this.attrs[VTX].get()
    } else if (name === '') {
      object = def
    } else {
      object = def.take(name)
    }
    return object
  },
  copy: function() {
    return phi
  },
  toString: function() {
    return `${NAME} ${VTX}=${vtx}`
  }
}

/**
 * Default empty package object.
 * @type {object}
 */
const def = pckg('', phi)

module.exports = phi
