const vertex = require('../../src/runtime/vertex')
const assert = require('assert');

describe('vertex', function() {
  it('should increase value', function() {
    const first = vertex.next()
    const second = vertex.next()
    assert.notEqual(first, second)
  })
})
