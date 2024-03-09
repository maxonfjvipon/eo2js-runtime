const ErAbstract = require('./ErAbstract');

/**
 * This Error is thrown by the {@link error} object only.
 */
class ErError extends ErAbstract {
  /**
   * Ctor.
   * @param {Object} enclosure - Enclosure inside the error
   */
  constructor(enclosure) {
    super(ErError.safeMessage(enclosure))
    this.name = 'ErError'
    this.enclosure = enclosure
  }

  /**
   * Retrieve message from enclosure safely.
   * @param {Object} enclosure - Enclosure inside the error
   * @return {string}
   */
  static safeMessage(enclosure) {
    return 'Hello'
  }
}

module.exports = ErError
