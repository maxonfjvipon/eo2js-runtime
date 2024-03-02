const object = require('../../../../runtime/object.js')
const dataized = require('../../../../runtime/dataized')
const data = require('../../../../runtime/data')
const {LAMBDA} = require('../../../../runtime/attribute/specials')
const at_void = require('../../../../runtime/attribute/at-void');

/**
 * Stdout.
 * @param {object} sigma - Sigma
 * @return {any} - Stdout object
 */
const stdout = function(sigma) {
  const obj = object(sigma, 'stdout')
  obj.attrs['text'] = at_void('text')
  obj.assets[LAMBDA] = function(self) {
    console.log(dataized(self.take('text')))
    return data.toObject(true)
  }
  return obj
}

module.exports = stdout
