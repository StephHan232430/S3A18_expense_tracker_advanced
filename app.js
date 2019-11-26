const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Record = require('./models/record')
const app = express()

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

// routes
// 首頁
app.get('/', (req, res) => {
  Record.find((err, records) => {
    if (err) return console.log(err)
    let totalAmount = 0
    for (let record of records) {
      totalAmount += record.amount
      switch (record.category) {
        case 'household':
          record.household = true
          break
        case 'transportation':
          record.transportation = true
          break
        case 'entertainment':
          record.entertainment = true
          break
        case 'diet':
          record.diet = true
          break
        default:
          record.others = true
      }
    }
    return res.render('index', { records, totalAmount })
  })
})

// 完成新增
app.post('/records/new', (req, res) => {
  // console.log(req.body.date.toString)
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    amount: req.body.amount,
    date: req.body.date
  })
  record.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

// 完成編輯

// 刪除

// 新增頁面

// 編輯頁面



app.listen(3000, () => {
  console.log('App is running')
})