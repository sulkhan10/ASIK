const { Disease } = require("../models");
class DiseaseController{
    static diseases(req,res) {
        Disease.findAll()
        .then(diseases=>res.render('diseases',{diseases}))
        .catch((err) => res.send(err));
    }
}

module.exports = DiseaseController