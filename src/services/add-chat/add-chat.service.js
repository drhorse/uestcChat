const hooks = require('./add-chat.hooks')

module.exports = function () {
  const app = this
  const chats = app.service('chats')
  
  app.use('/add-chat', {
    find(data) {
      return chats.create({ 
        message: data.query.message, 
      })
    }
  })
  
  const service = app.service('add-chat')
  service.hooks(hooks)
}