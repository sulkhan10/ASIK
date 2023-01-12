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
    User.findAll()
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
}

module.exports = UserController;
