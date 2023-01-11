const express = require('express')
const UserController = require('../controllers/UserController')
const ContactController = require('../controllers/ContactController')
const DiseaseController = require('../controllers/DiseaseController')
const router = express.Router()



router.get('/', (req, res) => {
  res.render('landing')
})
router.get('/register', UserController.registerForm)
router.post('/register', UserController.postRegister)
router.get('/login', UserController.loginForm)
router.post('/login', UserController.postLogin)

router.use((req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login')
  } else {
    next()
  }
})

router.get('/home', (req, res) => {
  res.render('home')
})
router.get('/users', UserController.users)
router.get('/contacts', ContactController.contacts)
router.get('/diseases', DiseaseController.diseases)
// router.get('/symptom', Controller.addSymptom)
module.exports = router