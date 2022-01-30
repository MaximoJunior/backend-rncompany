const { getInfoRnc } = require("../helpers/getInfoRNC");


const getCompanyInformationByRNC = async(req, res) => {

    const { rnc } = req.params;


    try {

        const info = await getInfoRnc( rnc );

        if( !info ) {

          return res.json({
                message:"NOT FOUND",
            });

        }


        info.rnc = info.rnc.replace(/-/g, "");

        // Set default values to required properties( fields ) returned by DGII
        info.governmentBranch = info.governmentBranch ? info.governmentBranch : "ND";
        info.status = info.status ? info.status : "ND";
        info.economicActivity = info.economicActivity ? info.economicActivity : "ND";

        return  res.json({
            message:"OK",
            "company": info
         });


    } catch (error) {

        console.log("ERROR - getCompanyInformationByRNC() ");

        return res.status(500).json({
            message:"ERROR"
        });

    }
    
}

module.exports = {
    getCompanyInformationByRNC
}