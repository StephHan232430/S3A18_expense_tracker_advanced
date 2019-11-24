const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('project init')
})

app.listen(3000, () => {
  console.log('App is running')
})