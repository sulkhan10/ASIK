const { User, Disease, Symptom, SymptomDiseases } = require("../models");
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize')

class UserController {
  static registerForm(req, res) {
    res.render("registerForm");
  }
  static postRegister(req, res) {
    let { username, email, password, role } = req.body;
    User.create({ username, email, password, role })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => res.send(err));
  }
  static loginForm(req, res) {
    res.render("loginForm");
  }
  static postLogin(req, res) {
    let { username, password } = req.body;
    console.log(username, password);
    User.findOne({ where: { username } })
      .then((user) => {
        if (user) {
          let validatePassword = bcrypt.compareSync(password, user.password);
          if (validatePassword) {
            req.session.userId = user.id;
            req.session.role = user.role;
            console.log(req.session);
            return res.redirect("/home");
          } else {
            let error = `Password Salah`;
            return res.redirect(`/login?error=${error}`);
          }
        } else {
          let error = `Username Salah`;
          return res.redirect(`/login?error=${error}`);
        }
      })
      .catch((err) => res.send(err));
  }

  static users(req, res) {

    const { search } = req.query
    

    let option = {
      order: [
        ['role', 'ASC']
      ], where: search
    }

    User.findAll(option)
      .then((users) => res.render("users", { users }))
      .catch((err) => res.send(err));
  }

  static getLogout(req, res) {
    req.session.destroy(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/')
      }
    });
  }
  // static getSymptom(req, res) {
  //   const id = req.params.id
  //   User.findByPk(id, {
  //     include: 
  //     Symptom
  //   })
  //   .then(patients => {
  //     const symptoms = patients.Symptom.map(el => el.id)
  //     return Disease.findOne({include: [{model: SymptomDiseases, where: symptoms}]})
  //   })
  // }
}

module.exports = UserController;
