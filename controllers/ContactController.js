const { Contact } = require("../models");

class ContactController{
    static contacts(req,res) {
        Contact.findAll()
        .then(contacts=>res.render('contacts',{contacts}))
        .catch((err) => res.send(err));
    }
}

module.exports = ContactController