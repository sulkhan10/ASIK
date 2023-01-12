const { Symptom,Disease } = require('../models')
class SymptomController{
  static symptoms(req,res){
    Symptom.findAll({include:[Disease]})
    .then((symptoms) => {
      res.render('symptoms',{symptoms})
    })
    .catch(err => {
      res.send(err)
    })
  }


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