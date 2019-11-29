const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker-advanced', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(session({
  secret: 'Steph',
  resave: false,
  saveUninitialized: true
}))

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))
app.use('/records/filter', require('./routes/filter'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running')
})