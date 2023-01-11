const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()


router.get('/', (req, res) => {
  res.send('Birds home page')
})

router.get('/register', UserController.registerForm)
router.post('/register', UserController.postRegister)
router.get('/login', UserController.loginForm)
router.post('/login', UserController.postLogin)


router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router