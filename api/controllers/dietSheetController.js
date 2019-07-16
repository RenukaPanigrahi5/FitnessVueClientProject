const DietSheet = require('../model/dietSheetModel');
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
exports.getDietByCategory = function (req, res) {
    var dietCategory = req.query.dietCategory;
    
    if(dietCategory == "Healthy" ){
        dietCategory = "UnderWeight"
    }else if(dietCategory == "Obesity"){
        dietCategory = "OverWeight"
    }
    DietSheet.getDietByCategory(dietCategory, (err, dietSheets) => {
        if (err) {
            return res.json({
                success: false,
                msg: 'there is some error ',
                error: err
            });
        }else if (isEmptyObject(dietSheets)) {
            return res.json({
                success: false,
                msg: 'DietSheet not found for this category' + dietCategory
            });
        }
        else {
            res.json({
                success: true,
                dietSheets: dietSheets
            });
        }
    });
};

exports.addNewDiets = function (req, res) {
    if (req.body.dietSheets) {
        DietSheet.addManyDiets(req.body.dietSheets, (err, user) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to add multiple DietSheet' });
            } else {
                res.json({ success: true, msg: 'DietSheets added successfully' });
            }
        });
    } else {
        let newDietSheet = new DietSheet(req.body);
        DietSheet.addNewDiet(newDietSheet, (err, user) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to add new DietSheet' });
            } else {
                res.json({ success: true, msg: 'DietSheet added successfully' });
            }
        });
    }

};