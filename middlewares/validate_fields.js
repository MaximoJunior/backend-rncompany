const { validationResult } = require("express-validator")



const validateResults = ( showTags = [ 'msg', 'param', 'value' ] ) => {

    return ( (req, res, next ) => {

        const errorFormate = ( tags ) => {
            let obj = {};
            for (let index = 0; index < showTags.length; index++) {
                obj[ showTags[index] ] = tags[ showTags[index] ]
            }
            return obj;
        }
    
        const errors = validationResult(req).formatWith( errorFormate );
    
        if( !errors.isEmpty() ){
    
            return res.status(400).json({
                message: "Error",
                errors : errors.array()
            });
        }
    
        next();
    });

    
}



module.exports = {
    validateResults
}
