const assert = require('assert');
const tr = require('../../../../temp/objects/org/eolang/try');
const data = require('../../../../temp/runtime/data');
const object = require('../../../../temp/runtime/object');
const dataized = require('../../../../temp/runtime/dataized');
const attr = require('../../../../temp/runtime/attribute/attr');
const ErFailure = require('../../../../temp/runtime/error/ErFailure');
const {PHI, LAMBDA} = require('../../../../temp/runtime/attribute/specials');
const at_simple = require('../../../../temp/runtime/attribute/at-simple');
const stdout = require('../../../../temp/objects/org/eolang/io/stdout');

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
 * Not broken main object for try.
 * @return {Object} - Object
 */
const main = function() {
  const obj = object({}, 'main')
  obj.attrs[PHI] = at_simple(data.toObject(true))
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
 * @param {Object} [final] - Finally attribute
 * @return {Object} - Try object
 */
const tryObj = function(main, final) {
  return tr({}).with({
    'main': main,
    'catch': catcher(),
    'finally': final || nop()
  })
}

describe('try', function() {
  it(`should catch error via ${PHI}`, function() {
    assert.equal(dataized(tryObj(broken(PHI)), data.STRING), message)
  })
  it(`should catch error via ${LAMBDA}`, function() {
    assert.equal(dataized(tryObj(broken(LAMBDA)), data.STRING), message)
  })
  it('should be dataized to body', function() {
    assert.equal(dataized(tryObj(main()), data.BOOL), true)
  })
  it('should dataize "finally" attribute', function() {
    const logs = []
    dataized(
      tryObj(
        main(),
        stdout({}, {log: (...args) => logs.push(...args)}).with({
          0: data.toObject('Hello')
        })
      )
    )
    assert.ok(logs.includes('Hello'))
  })
  it('should not dataize body twice', function() {
    const logs = []
    dataized(
      tryObj(
        stdout({}, {log: (...args) => logs.push(...args)}).with({
          0: data.toObject('Hey')
        })
      )
    )
    assert.equal(logs.length, 1)
  })
})
