const { Symptom } = require('../models')
class SymptomController{
  static addSymptoms(req, res) {
    res.render(`add-symptoms`)
  }

  static createSymptoms(req, res) {
    const { name } = req.body
    Symptom.create({name})
    .then(() => {
      res.redirect('/diseases')
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = SymptomController