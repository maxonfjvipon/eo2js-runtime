const {DELTA} = require('./attribute/specials')
const bytesOf = require('./bytes-of');

/**
 * Cache.
 * @type {{}}
 */
const cache = {}

/**
 * Data to object converter.
 * @type {{toObject: (function(string|boolean|number|array.<string>|array.<number>): object)}}
 */
const data = {
  toObject: function(data) {
    let key
    if (typeof data === 'number') {
      key = Number(data).toString()
    } else {
      key = data.toString()
    }
    if (!cache.hasOwnProperty(key)) {
      const phi = require('./phi')
      const bytes = phi.take('org.eolang.bytes').copy()
      bytes.assets[DELTA] = bytesOf(data).asBytes()
      if (Array.isArray(data)) {
        cache[key] = bytes
      } else {
        let take
        if (typeof data === 'number') {
          if (Number.isInteger(data)) {
            take = 'org.eolang.int'
          } else {
            take = 'org.eolang.float'
          }
        } else if (typeof data === 'string') {
          take = 'org.eolang.string'
        } else if (typeof data === 'boolean') {
          take = 'org.eolang.bool'
        } else {
          throw new Error(`Can't convert to object data ${data} of given type ${typeof data}`)
        }
        cache[key] = phi.take(take).copy().with({
          'as-bytes': bytes
        })
      }
    }
    return cache[key]
  },
  INT: 'int',
  STRING: 'string',
  FLOAT: 'float',
  BOOL: 'bool',
  BYTES: 'bytes'
}

module.exports = data
