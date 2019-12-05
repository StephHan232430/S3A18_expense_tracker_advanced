const mongoose = require('mongoose')
const Record = require('../record')
const recordSeeds = require('./record.json').results
const User = require('../user')
const userSeeds = require('./user.json').users
const bcrypt = require('bcryptjs')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker-advanced', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  for (let uNum = 0; uNum < userSeeds.length; uNum++) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userSeeds[uNum].password, salt, (err, hash) => {
        if (err) throw err
        userSeeds[uNum].password = hash
        User.create(userSeeds[uNum]).then(user => {
          for (let rNum = uNum * 5; rNum < (uNum + 1) * 5; rNum++) {
            Record.create({
              name: recordSeeds[rNum].name,
              merchant: recordSeeds[rNum].merchant,
              category: recordSeeds[rNum].category,
              amount: recordSeeds[rNum].amount,
              date: recordSeeds[rNum].date,
              userId: user._id
            })
          }
        }).catch(err => console.log(err))
      })
    })
  }
  console.log('seeded!')
})