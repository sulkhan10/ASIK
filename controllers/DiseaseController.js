const { Disease,Symptom } = require("../models");
class DiseaseController{
    static diseases(req,res) {
        Disease.findAll({include:[Symptom]})
        // .then(data=>{
        //     data.findOne({
        //         where : 
        //     })
        // })
        // .then(diseases=>res.send(diseases))
        .then(diseases=>res.render('diseases',{diseases}))
        .catch((err) => res.send(err));
    }
}

module.exports = DiseaseController