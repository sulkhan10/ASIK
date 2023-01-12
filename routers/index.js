const express = require('express')
const UserController = require('../controllers/UserController')
const ContactController = require('../controllers/ContactController')
const DiseaseController = require('../controllers/DiseaseController')
const SymptomController = require('../controllers/SymptomController')
const router = express.Router()

router.get('/', UserController.landing)
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

let isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
        res.redirect('/login')
      } else {
        next()
      }
}
let isDoctor = (req, res, next) => {
  if (req.session.role !== 'doctor') {
    let errors = `MOHON MAAF, menu patients dan akses data sensitif hanya bisa dilakukan oleh Dokter`
        res.redirect(`/home?errors=${errors}`)
      } else {
        next()
      }
}

router.get('/diseases', isLoggedIn, DiseaseController.diseases)
router.get('/symptoms',isLoggedIn, SymptomController.symptoms)
router.get('/users' ,isLoggedIn, isDoctor, UserController.users)
router.get('/contacts', ContactController.contacts)


router.get('/logout',isLoggedIn, UserController.getLogout)
router.get('/home',isLoggedIn, UserController.home)
router.get('/users/:id/edit', UserController.editUser)
router.post('/users/:id/edit',isLoggedIn, isDoctor, UserController.updateUser)
router.get('/users/:id/delete',isLoggedIn, isDoctor, UserController.deleteUser)

module.exports = router