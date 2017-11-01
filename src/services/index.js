const users = require('./users/users.service.js')
const chats = require('./chats/chats.service.js')
const login = require('./login/login.service.js')
const addChat = require('./add-chat/add-chat.service.js')
module.exports = function () {
  const app = this // eslint-disable-line no-unused-vars
  app.configure(users)
  app.configure(chats)
  app.configure(login)
  app.configure(addChat)
}
