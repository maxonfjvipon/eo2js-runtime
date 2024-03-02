/**
 * Vertex counter.
 * @type {number}
 */
let count = 1

/**
 * Vertex.
 * @type {{next: (function(): number)}}
 */
const vertex = {
  /**
   * Get next vertex number.
   * @return {number} - Next vertex number
   */
  next: function() {
    return count++
  }
}

module.exports = vertex
