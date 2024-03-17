const {RHO, SIGMA, VTX, LAMBDA, PHI} = require('./attribute/specials.js')
const vertex = require('./vertex')
const at_vtx = require('./attribute/at-vtx')
const at_safe = require('./attribute/at-safe');
const ErFailure = require('./error/ErFailure');
const validated = require('./validated');
const safe = require('./safe');
const at_rho = require('./attribute/at-rho');
const at_sigma = require('./attribute/at-sigma');

/**
 * Filter object attributes function.
 * @param {string} key - Object key
 * @return {boolean} - If key isn't in default attributes set
 */
const noDefault = function(key) {
  return ![RHO, SIGMA, VTX].includes(key)
}

/**
 * Get attribute by position.
 * @param {array.<string>} attrs - Attributes without default ones
 * @param {number} pos - Position
 * @return {string} - Attribute by position
 */
const attrByPosition = function(attrs, pos) {
  const filtered = attrs.filter(noDefault)
  const index = filtered.findIndex((_, index) => index === pos)
  if (index === -1) {
    throw new ErFailure(`There's no attribute with position ${pos}`)
  }
  return filtered[index]
}

/**
 * Object.
 * @param {object} sigma - Sigma
 * @param {String} name - Name of the object
 * @return {object} Object
 */
const object = function(sigma, name = 'object') {
  const vtx = vertex.next()
  const obj = {
    /**
     * Attributes.
     */
    attrs: {
      [RHO]: at_rho(sigma),
      [SIGMA]: at_sigma(sigma)
    },
    /**
     * Assets.
     */
    assets: {},
    /**
     * Copy itself.
     * @return {Object} - Copied object.
     */
    copy: function() {
      const rho = this.attrs[RHO]
      const copy = object(sigma, name)
      copy.attrs[RHO] = rho.copy(copy)
      Object.keys(this.attrs)
        .filter(noDefault)
        .forEach((key) => {
          copy.attrs[key] = this.attrs[key].copy(copy)
        })
      Object.keys(this.assets)
        .forEach((key) => {
          copy.assets[key] = this.assets[key]
        })
      return copy
    },
    /**
     * Set attributes to the object.
     * @param {Object} bindings - Attribute bindings
     * @return {obj} - Self with attached attributes
     * @throws ErFailure - If something wrong with bindings
     */
    with: function(bindings) {
      const attrs = Object.keys(this.attrs)
      Object.keys(bindings).forEach((attr) => {
        const binding = bindings[attr]
        const pos = Number(attr)
        if (!isNaN(pos)) {
          if (pos < 0) {
            throw new ErFailure(`Can't put attribute by negative position (${pos})`)
          }
          if (!Number.isInteger(pos)) {
            throw new ErFailure(`Can't put attribute by float position (${pos})`)
          }
          attr = attrByPosition(attrs, pos)
        }
        if (!attrs.includes(attr)) {
          throw new ErFailure(`Attribute ${attr} is absent, can't put`)
        }
        this.attrs[attr].put(binding)
      })
      return this
    },
    /**
     * Retrieve object by attribute name or position
     * @param {String|Number} attr - Attribute name or position
     * @return {Object} - Retrieved attribute by name or position
     * @throws ErFailure - If something wrong with attribute retrieving
     */
    take: function(attr) {
      const pos = Number(attr)
      if (!isNaN(pos)) {
        if (pos < 0) {
          throw new ErFailure(`Attribute position can't be negative (${attr})`)
        }
        if (!Number.isInteger(pos)) {
          throw new ErFailure(`Can't take attribute by float position number (${attr})`)
        }
        attr = attrByPosition(Object.keys(this.attrs), pos)
      }
      let object
      if (attr === LAMBDA) {
        if (this.attrs.hasOwnProperty(LAMBDA)) {
          throw new ErFailure(`${LAMBDA} can't be used as attribute, only as asset`)
        }
        if (!this.assets.hasOwnProperty(LAMBDA)) {
          throw new ErFailure(`Can't take ${LAMBDA} asset because it's absent`)
        }
        object = validated(() => safe(this.assets[LAMBDA](this)))
      } else if (this.attrs.hasOwnProperty(attr)) {
        object = at_safe(this.attrs[attr]).get()
      } else if (this.attrs.hasOwnProperty(PHI)) {
        object = this.take(PHI).take(attr)
      } else if (this.assets.hasOwnProperty(LAMBDA)) {
        object = this.take(LAMBDA).take(attr)
      } else {
        throw new ErFailure(`Can't find ${attr} attribute`)
      }
      return object
    },
    /**
     * Print itself.
     * @return {String} - String representation of object
     */
    toString: function() {
      return `${name}, ${VTX}=${vtx}`
    }
  }
  obj.attrs[VTX] = at_vtx(vtx, obj)
  return obj
}

module.exports = object
