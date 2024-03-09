const {DELTA} = require('./attribute/specials')
const bytesOf = require('./bytes-of');

/**
 * Data to object converter.
 * @type {{BYTES: string, FLOAT: string, BOOL: string, STRING: string, INT: string, toObject: (function(string|boolean|number|array.<string>|array.<number>): object)}}
 */
const data = {
  toObject: function(data) {
    const phi = require('./phi')
    const bytes = phi.take('org.eolang.bytes').copy()
    bytes.assets[DELTA] = bytesOf(data).asBytes()
    let object
    if (Array.isArray(data)) {
      object = bytes
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
      object = phi.take(take).copy().with({
        'as-bytes': bytes
      })
    }
    return object
  },
  INT: 'int',
  STRING: 'string',
  FLOAT: 'float',
  BOOL: 'bool',
  BYTES: 'bytes'
}

module.exports = data
