const { authenticate } = require('feathers-authentication').hooks
const { associateCurrentUser } = require('feathers-authentication-hooks')
const { disallow, populate } = require('feathers-hooks-common')

const userSchema = {
  include: {
    service: 'users',
    nameAs: 'author',
    parentField: 'authorId',
    childField: 'id',
    query: {
      $select: ['username'],
    }
  }
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ associateCurrentUser({ idField: 'id', as: 'authorId' }) ],
    update: [ disallow('external') ],
    patch: [ disallow('external') ],
    remove: [ disallow('external') ]
  },

  after: {
    all: populate({ schema: userSchema }),
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
