const fs = require('fs')
const path = require('path')
const object = require('./object')
const {LAMBDA, RHO} = require('./attribute/specials')
const at_simple = require('./attribute/at-simple')

/**
 * Package object.
 * @param {String} fqn - FQN of package object
 * @param {object} sigma - Sigma
 * @return {object} - Package object
 */
const pckg = function(fqn, sigma) {
  const obj = object(sigma, `Package '${fqn}'`)
  obj.assets[LAMBDA] = function(self) {
    if (fqn !== '') {
      const rho = self.take(RHO)
      return `${rho.assets[LAMBDA](rho)}.${fqn}`
    }
    return fqn
  }
  obj.with = function(_) {
    throw new Error(`Can't put object to Package object '${fqn}'`)
  }
  obj.take = function(name) {
    let obj
    if (this.attrs.hasOwnProperty(name)) {
      obj = this.attrs[name].get()
    } else if (!name.includes('.')) {
      const before = this.assets[LAMBDA](this)
      const full = before === '' ? name : `${before.substring(1)}.${name}`
      const pth = path.resolve(__dirname, '../objects', ...full.split('.'))
      if (fs.existsSync(pth) && fs.statSync(pth).isDirectory()) {
        obj = pckg(name, this)
        this.attrs[name] = at_simple(obj)
      } else {
        const file = `${pth}.js`
        if (fs.existsSync(file) && fs.statSync(file).isFile()) {
          obj = require(file)(this)
          this.attrs[name] = at_simple(obj)
        } else {
          throw new Error(`Couldn't find directory ${pth} or file ${file}`)
        }
      }
    } else {
      const split = name.split('.')
      let next = this.take(split[0])
      for (let i = 1; i < split.length; ++i) {
        next = next.take(split[i])
      }
      obj = next
    }
    return obj
  }
  obj.copy = function() {
    return this
  }
  return obj
}

module.exports = pckg
