const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res) => {
  console.log(req.body)
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  console.log(req.body)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

module.export = router