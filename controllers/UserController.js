const { User } = require("../models");
const bcrypt = require("bcryptjs");

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
    User.findOne({ where: { username } })
      .then((user) => {
        if (user) {
          let validatePassword = bcrypt.compareSync(password, user.password);
          if (validatePassword) {
            req.session.userId = user.id;
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
    
    static users(req,res) {
      User.findAll()
      .then(users=>res.render('users',{users}))
      .catch((err) => res.send(err));
  }
}

module.exports = UserController;
