const hooks = require('./chat.hooks')

module.exports = function () {
  const app = this
  const chats = app.service('chats')
  
  app.use('/chat', {
    find(data) {
      return chats.create({
        message: new Buffer(data.headers.message, 'base64').toString(),
        authorId: data.user.id 
      })
    }
  })
  
  const service = app.service('chat')
  service.hooks(hooks)
}