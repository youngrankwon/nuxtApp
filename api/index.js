const express = require('express')
const app = express()
// 미들웨어이기 때문에 port는 따로 지정하지 않아도 되는 것 같다.

// route를 직접 작성할 경우
app.get('/', function (req, res) {
  res.send('success!! ' + Math.random())
})

// route 설정을 분리할 경우
// 물론 여럿 추가할 수 있음
const hello = require('./hello')
app.use('/hello', hello)

module.exports = {
  path: '/api',
  handler: app
}