const users = require('./users/users.service.js')
const chats = require('./chats/chats.service.js')
const login = require('./login/login.service.js')
const chat = require('./chat/chat.service.js')
const passwd = require('./passwd/passwd.service.js')
module.exports = function () {
  const app = this // eslint-disable-line no-unused-vars
  app.configure(users)
  app.configure(chats)
  app.configure(login)
  app.configure(chat)
  app.configure(passwd)
}
