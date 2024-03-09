const ErFailure = require('./error/ErFailure');
const ErError = require('./error/ErError');
const data = require('./data');

/**
 * Validate given callback.
 * If catches {@link ErFailure} - throws {@link ErError}.
 * @param {function(): any} callback - Callback to validate
 * @return {Object} - Callback result
 */
const validated = function(callback) {
  try {
    return callback()
  } catch (error) {
    if (error instanceof ErFailure) {
      throw new ErError(
        data.toObject(error.message)
      )
    } else {
      throw error
    }
  }
}

module.exports = validated
