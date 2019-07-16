const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// User Schema
const DietSheetSchema = mongoose.Schema({     
    dietCategory: {
        type: String,
        required: true
    },
    dietTime: {
        type: String,
        required: 'true'
    },
    dietInDetails:{
        type: Array,
        required: 'true'
    }

});
const DietSheet = module.exports = mongoose.model('DietSheet', DietSheetSchema);
module.exports.getDietByCategory = function(dietCategory, callback) {
    const query = {dietCategory: dietCategory}
DietSheet.find(query, callback);
}
module.exports.addNewDiet = function(newDiet, callback){
    newDiet.save(callback);
}
module.exports.addManyDiets = function(newDiets, callback){
    DietSheet.create(newDiets, callback);
}