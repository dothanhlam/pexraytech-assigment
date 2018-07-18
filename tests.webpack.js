require('babel-polyfill')
var context = require.context('./spec/', true, /-test\.jsx?$/)
context.keys().forEach(context)