const { Symptom } = require('../models')
class SymptomController{
  static addSymptoms(req, res) {
    res.render(`add-symptoms`, { errors: req.query.errors })
  }

  static createSymptoms(req, res) {
    const { name } = req.body
    Symptom.create({name})
    .then(() => {
      res.redirect('/diseases')
    })
    .catch(err => {
      if (err.name == "SequelizeValidationError") {
        let errors = err.errors.map(el => el.message)
        res.redirect(`/symptoms?errors=${errors}`)
      } else {
        res.send(err)
      }
    })
  }

}

module.exports = SymptomController