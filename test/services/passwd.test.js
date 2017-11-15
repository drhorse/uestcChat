const assert = require('assert')
const app = require('../../src/app')

describe('\'passwd\' service', () => {
  it('registered the service', () => {
    const service = app.service('passwd')

    assert.ok(service, 'Registered the service')
  })
})
