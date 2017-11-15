const hooks = require('./passwd.hooks')

module.exports = function () {
  const app = this
  const users = app.get('users')

  app.use('/passwd', {
    find(data) {
      return users.patch(data.user.id, { password: data.headers.password })
    }    
  })
  const service = app.service('passwd')
  service.hooks(hooks)
}
