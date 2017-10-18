// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const chats = sequelizeClient.define('chats', {
    message: { type: Sequelize.STRING, allowNull: false }
  })

  chats.associate = function (models) { 
    chats.belongsTo(models.users, { as: 'author'})
  }

  return chats
}
