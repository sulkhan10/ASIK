const express = require('express')
const UserController = require('../controllers/UserController')
const ContactController = require('../controllers/ContactController')
const DiseaseController = require('../controllers/DiseaseController')
const SymptomController = require('../controllers/SymptomController')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('landing')
})
router.get('/register', UserController.registerForm)
router.post('/register', UserController.postRegister)
router.get('/login', UserController.loginForm)
router.post('/login', UserController.postLogin)

// router.use((req, res, next) => {
//   if (!req.session.userId) {
//     res.redirect('/login')
//   } else {
//     next()
//   }
// })

router.get('/diseases', DiseaseController.diseases)
router.get('/symptoms', SymptomController.symptoms)
router.get('/users', UserController.users)
router.get('/contacts', ContactController.contacts)


router.get('/logout', UserController.getLogout)
router.get('/home', (req, res) => {
  res.render('home')
})
router.get('/users/:id/edit', UserController.editUser)
router.post('/users/:id/edit', UserController.updateUser)
router.get('/users/:id/delete', UserController.deleteUser)

router.get('/diseases', DiseaseController.diseases)
router.get('/symptoms', SymptomController.addSymptoms)
router.post('/symptoms', SymptomController.createSymptoms)
module.exports = router