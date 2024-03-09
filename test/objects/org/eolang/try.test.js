const assert = require('assert');
const tr = require('../../../../temp/objects/org/eolang/try');
const data = require('../../../../temp/runtime/data');
const object = require('../../../../temp/runtime/object');
const dataized = require('../../../../temp/runtime/dataized');
const attr = require('../../../../temp/runtime/attribute/attr');
const ErFailure = require('../../../../temp/runtime/error/ErFailure');
const {PHI, LAMBDA} = require('../../../../temp/runtime/attribute/specials');

const message = 'something is broken'

/**
 * Broken object that throws {@link ErFailure}.
 * @param {String} name - Name of the attribute or asset
 * @return {Object} - Broken
 */
const broken = function(name) {
  const obj = object({}, 'broken')
  if (name === LAMBDA) {
    obj.assets[LAMBDA] = function() {
      throw new ErFailure(message)
    }
  } else {
    obj.attrs[name] = attr.lambda(obj, function(_) {
      throw new ErFailure(message)
    })
  }
  return obj
}

/**
 * Catcher.
 * @return {Object} - Catcher
 */
const catcher = function() {
  const obj = object({}, 'catcher')
  obj.attrs['ex'] = attr.void('ex')
  obj.attrs[PHI] = attr.lambda(obj, (rho) => rho.take('ex'))
  return obj
}

/**
 * Nop.
 * @return {Object} - Nop
 */
const nop = function() {
  const obj = object({}, 'nop')
  obj.attrs[PHI] = attr.simple(data.toObject(true))
  return obj
}

/**
 * Build try object.
 * @param {Object} main - Main attribute
 * @return {Object} - Try object
 */
const tryObj = function(main) {
  return tr({}).with({
    'main': main,
    'catch': catcher(),
    'finally': nop()
  })
}

describe('try', function() {
  it(`should catch error via ${PHI}`, function() {
    assert.equal(dataized(tryObj(broken(PHI)), data.STRING), message)
  })
  it(`should catch error via ${LAMBDA}`, function() {
    assert.equal(dataized(tryObj(broken(LAMBDA)), data.STRING), message)
  })
})
