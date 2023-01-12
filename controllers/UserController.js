const {
  User,
  Disease,
  Symptom,
  SymptomDiseases,
  Contact,
} = require("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const sendMail = require("../helpers/sendMail");

class UserController {
  static home(req, res) {
    let date = User.timeNow("id-ID");
    res.render("landing", { date });
  }
  static registerForm(req, res) {
    let { errors } = req.query;
    console.log(errors);
    Disease.findAll()
      .then((diseases) => res.render("registerForm", { diseases, errors }))
      .catch((err) => res.send(err));
  }
  static postRegister(req, res) {
    let {
      phone,
      address,
      firstName,
      lastName,
      username,
      email,
      password,
      role,
      DiseaseId,
    } = req.body;
    User.create({ username, email, password, role, DiseaseId })
      .then(() => {
        return Contact.create({ phone, address, firstName, lastName });
      })
      .then(() => {
        sendMail(email);
        res.redirect("/login");
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          let errors = err.errors.map((x) => {
            return x.message;
          });
          res.redirect(`/register?errors=${errors}`);
        }else{
          res.send(err)
        }
      })
  }
  static loginForm(req, res) {
    res.render("loginForm");
  }
  static postLogin(req, res) {
    let { username, password } = req.body;
    // console.log(username, password);
    User.findOne({ where: { username } })
      .then((user) => {
        if (user) {
          let validatePassword = bcrypt.compareSync(password, user.password);
          if (validatePassword) {
            req.session.userId = user.id;
            req.session.role = user.role;
            // console.log(req.session);
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
    let { search } = req.query;
    let options = {
      where: { role: "patient" },
      include: [{ model: Disease }, { model: Contact }],
    };
    if (search) {
      options.where.username = {
        [Op.iLike]: `%${search}%`,
      };
    }
    User.findAll(options)
      // .then(data=>res.send(data))
      .then((users) => res.render("users", { users }))
      .catch((err) => res.send(err));
  }

  static getLogout(req, res) {
    req.session.destroy(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
      }
    });
  }
  static deleteUser(req, res) {
    const id = req.params.id;
    User.findByPk(id)
      .then((user) => {
        if (!user) throw new Error("User Not found");
        return user.destroy();
      })
      .then(() => {
        return Contact.findByPk(id);
      })
      .then((contact) => {
        if (!contact) throw new Error("Contact Not found");
        return contact.destroy();
      })
      .then(() => res.redirect("/users"))
      .catch((err) => res.send(err));
  }

  static editUser(req, res) {
    let { errors } = req.query;
    const id = req.params.id;
    let options = {
      where: { role: "patient" },
      include: { model: Contact },
    };
    let data = {};
    Disease.findAll()
      .then((diseases) => {
        data.diseases = diseases;
        return User.findByPk(id, options);
      })
      .then((user) => {
        data.user = user;
        res.render("editUser", { ...data ,errors});
      })
      .catch((err) => res.send(err));
  }
  static updateUser(req, res) {
    let { id } = req.params;
    let { firstName, lastName, phone, address, username, email, DiseaseId } =
      req.body;
    // res.send(req.body)
    User.update({ username, email, DiseaseId }, { where: { id } })
      .then(() => {
        return Contact.update(
          { phone, address, firstName, lastName },
          { where: { id } }
        );
      })
      .then(() => {
        res.redirect("/users");
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          let errors = err.errors.map((x) => {
            return x.message;
          });
          res.redirect(`/users/${id}/edit?errors=${errors}`);
        }else{
          res.send(err)
        }
      })
  }
}

module.exports = UserController;
