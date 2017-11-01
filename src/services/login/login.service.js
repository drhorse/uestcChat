const rp = require('request-promise-native')

module.exports = function () {
  const app = this

  app.use('/login', {
    find(data) {
      return rp({
        method: 'POST',
        uri: 'http://chat.shijibaina.com/authentication',
        body: {
          strategy: 'local', 
          username: data.headers.username, 
          password: data.headers.password 
        },
        json: true
      })
    }
  })
}