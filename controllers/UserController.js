const {User} = require('../models')
const bcrypt = require("bcryptjs");

class UserController{
    static registerForm(req,res){
        res.render('registerForm')
    }
    static postRegister(req,res){
        res.send('ok')
    }
    static loginForm(req,res){
        res.send('ok')
    }
    static postLogin(req,res){
        res.send('ok')
    }
}

module.exports = UserController