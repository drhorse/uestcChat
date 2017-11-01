module.exports = function () {
  const app = this
  const authentication = app.service('authentication')

  app.use('/login', {
    find(data) {
      return authentication.create({ 
        strategy: 'local', 
        username: data.query.username, 
        password: data.query.password 
      })
    }
  })
}