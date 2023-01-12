const { Contact } = require("../models");

class ContactController{
    static contacts(req,res) {
        Contact.findAll()
        .then(contacts=>res.render('contacts',{contacts}))
        .catch((err) => res.send(err));
    }
    
    static addContacts(req, res) {
        res.render(`add-contact`)
      }
    
      static createContacts(req, res) {
        const { phone, address } = req.body
        Contact.create({phone, address})
        .then(() => {
          res.redirect('/contacts')
        })
        .catch(err => {
          res.send(err)
        })
      }

}

module.exports = ContactController