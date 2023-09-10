const Company = require('../models/company');

const getCompanies = async (req, res) => {

    try {

        const [ total, companies ] = await Promise.all([
            Company.countDocuments({}),
            Company.find({})
        ]);


        res.json({
            total,
            companies
        });

    } catch (error) {
          console.log("Error - getCompany:", error );
          res.status(500).json( { message: "Error" } );
    }
    
}

const createCompany = async (req, res) => {

    const { 
        _id,
        ...data } = req.body;

    try {

        const found = await Company.findOne({ rnc : data.rnc });

        if( found ) {
            return res.json({
                message: `Este Numero RNC : ${found.rnc}, ya esta registrado por otra Empresa`,
                company: found
             });
        }

        const company = new Company( data );
        await company.save();

        res.status(201).json({
            message: "OK",
            company
        });

    } catch (error) {

        console.log("Error - createCompany:", error );
        res.status(500).json( { message: "Error" } );

    }

    
}

const updateCompany = async (req, res) => {

    const { _id, ...data } = req.body;
    const { id } = req.params;

    try {

        const company = await Company.findByIdAndUpdate( id, data, { new: true } );
       

        res.status(200).json({
            message: "OK",
            company
        });

    } catch (error) {

        console.log("Error - updateCompany:", error );
        res.status(500).json( { message: "Error" } );

    }

    
}

const getCompany = async (req, res) => {
    const { id } = req.params;

    try {

        const company = await Company.findById( id );
       

        res.status(200).json({
            message: "OK",
            company
        });

    } catch (error) {

        console.log("Error - updateCompany:", error );
        res.status(500).json( { message: "Error" } );

    }

    
}

const deleteCompany = async (req, res) => {

    const { id } = req.params;

    try {

        const company = await Company.findByIdAndDelete( id );
       

        res.status(200).json({
            message: "OK",
            company
        });

    } catch (error) {

        console.log("Error - deleteCompany:", error );
        res.status(500).json( { message: "Error" } );

    }

    
}




module.exports = {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
}