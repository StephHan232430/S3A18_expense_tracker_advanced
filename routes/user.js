const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res) => {
  console.log(req.body)
  const { name, email, password, password2 } = req.body
  let errors = []

  if (!email || !password || !password2) {
    errors.push('註冊失敗...email、password和confirm password為必填')
  }
  if (password !== password2) {
    errors.push('註冊失敗...password與confirm password不符')
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push('註冊失敗...此email已被註冊過')
        res.render('register', { name, email, password, password2 })
      } else {
        const newUser = new User({
          name,
          email,
          password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
  }
})

router.get('/login', (req, res) => {
  const errors = req.flash().error
  return res.render('login', { errors })
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
    badRequestMessage: 'Email或密碼錯誤'
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出～')
  res.redirect('/users/login')
})

module.exports = router