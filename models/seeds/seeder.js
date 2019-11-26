const mongoose = require('mongoose')
const Record = require('../record')
const recordSeeds = require('./record.json').results

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < recordSeeds.length; i++) {
    Record.create({
      name: recordSeeds[i].name,
      category: recordSeeds[i].category,
      amount: recordSeeds[i].amount,
      date: recordSeeds[i].date
    })
  }
  console.log('seeded!')
})

