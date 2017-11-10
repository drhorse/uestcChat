// To use: fly production
const plan = require('flightplan') // https://github.com/pstadler/flightplan

const url        = 'shijibaina.com'
const appName    = 'uestcchat'
const configFile = '../uestcchat.config.js'
const username   = 'deploy'
const rsaKey     = '/Users/jeff/.ssh/id_rsa'

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()
  const ms = now.getMilliseconds()
  return [year, month, day].map(formatNumber).join('_') 
    + '-' 
    + [hour, minute, second].map(formatNumber).join(':')
    + '-' + ms
}

const tmpDir = appName + '-' + formatTime()

plan.target('production', [{
  host: url,
  username: username,
  privateKey: rsaKey,
  agent: process.env.SSH_AUTH_SOCK
}])

plan.local(function(local) {
  local.log('Local side')
  const filesToCopy = local.exec('git ls-files', {silent: true})
  local.transfer(filesToCopy, '/tmp/' + tmpDir)
})

plan.remote(function(remote) {
  remote.log('Server side')
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~/', {user: username})
  remote.rm('-rf /tmp/' + tmpDir)
  remote.log('Install dependencies')
  remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username})
  remote.log('Reload application')
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/' + appName, {user: username})
  remote.sudo('pm2 delete ' + appName, {user: username, failsafe: true})
  remote.sudo('cd ~/' + appName + ';pm2 start ' + configFile, {user: username})
})