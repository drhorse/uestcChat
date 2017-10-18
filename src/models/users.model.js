// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const users = sequelizeClient.define('users', {  
    username: { type: Sequelize.STRING(191), allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
  })

  return users
}
