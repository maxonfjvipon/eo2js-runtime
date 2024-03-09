const {RHO, SIGMA, VTX, LAMBDA, PHI} = require('./attribute/specials.js')
const vertex = require('./vertex')
const at_simple = require('./attribute/at-simple')
const at_fixed = require('./attribute/at-fixed')
const at_vtx = require('./attribute/at-vtx')
const at_safe = require('./attribute/at-safe');
const ErFailure = require('./error/ErFailure');
const validated = require('./validated');
const safe = require('./safe');

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
    attrs: {
      [RHO]: at_simple(sigma),
      [SIGMA]: at_fixed(at_simple(sigma))
    },
    assets: {},
    copy: function() {
      const copy = object(sigma, name)
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
    take: function(name) {
      const pos = Number(name)
      if (!isNaN(pos)) {
        if (pos < 0) {
          throw new ErFailure(`Attribute position can't be negative (${name})`)
        }
        if (!Number.isInteger(pos)) {
          throw new ErFailure(`Can't take attribute by float position number (${name})`)
        }
        name = attrByPosition(Object.keys(this.attrs), pos)
      }
      let object
      if (name === LAMBDA) {
        if (this.attrs.hasOwnProperty(LAMBDA)) {
          throw new ErFailure(`${LAMBDA} can't be used as attribute, only as asset`)
        }
        if (!this.assets.hasOwnProperty(LAMBDA)) {
          throw new ErFailure(`Can't take ${LAMBDA} asset because it's absent`)
        }
        object = validated(() => safe(this.assets[LAMBDA](this)))
      } else if (this.attrs.hasOwnProperty(name)) {
        object = at_safe(this.attrs[name]).get()
      } else if (this.attrs.hasOwnProperty(PHI)) {
        object = this.take(PHI).take(name)
      } else if (this.assets.hasOwnProperty(LAMBDA)) {
        object = this.take(LAMBDA).take(name)
      } else {
        throw new ErFailure(`Can't find ${name} attribute`)
      }
      return object
    },
    toString: function() {
      return `${name}, ${VTX}=${vtx}`
    }
  }
  obj.attrs[VTX] = at_vtx(vtx, obj)
  return obj
}

module.exports = object
