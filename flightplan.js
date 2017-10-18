// To use: fly production

/*global process*/
var plan = require('flightplan')

var url = 'webuy-china.com'
var appName = 'uestcchat'
var configFile = '../uestcchat.config.js'
var username = 'root'
var rsaKey = '/Users/jeff/.ssh/id_rsa'
const now = new Date()
var tmpDir = appName + '-' + now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate() + '-' + now.getHours() 
           + '-' + now.getMinutes() + '-' + now.getSeconds() + '-' + now.getMilliseconds()

plan.target('production', [
  {
    host: url,
    username: username,
    privateKey: rsaKey,
    agent: process.env.SSH_AUTH_SOCK
  }
])

plan.local(function(local) {
  local.log('Local side')
  var filesToCopy = local.exec('git ls-files', {silent: true})
  local.transfer(filesToCopy, '/tmp/' + tmpDir)
})

plan.remote(function(remote) {
  remote.log('Server side')
  remote.exec('cp -R /tmp/' + tmpDir + ' ~/', {user: username})
  remote.rm('-rf /tmp/' + tmpDir)
  remote.exec('npm --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username})
  remote.exec('ln -snf ~/' + tmpDir + ' ~/' + appName, {user: username})
  remote.exec('pm2 delete ' + appName, {user: username, failsafe: true})
  remote.exec('cd ~/' + appName + ';pm2 start ' + configFile, {user: username})
})
