const { Contact } = require("../models");

class ContactController{
    static contacts(req,res) {
        Contact.findAll()
        .then(contacts=>res.render('contacts',{contacts}))
        .catch((err) => res.send(err));
    }
    
    static addContacts(req, res) {
        res.render(`add-contact`, { errors: req.query.errors })
      }
    
      static createContacts(req, res) {
        const { phone, address } = req.body
        Contact.create({phone, address})
        .then(() => {
          res.redirect('/contacts')
        })
        .catch(err => {
          if (err)
          if (err.name == "SequelizeValidationError") {
            let errors = err.errors.map(el => el.message)
            res.redirect(`/contacts/add?errors=${errors}`)
          } else {
            res.send(err)
          }
        })
      }

      static deleteContacts(req, res) {
        Contact.destroy()
        .then(() => {
          res.redirect('/user')
        })
        .catch(err => {
          res.send(err)
        })
      }


}

module.exports = ContactController