const { Router } = require("express");
const { createCompany, getCompanies, updateCompany, deleteCompany, getCompany } = require('../controllers')
const { check } = require('express-validator');
const { validateResults } = require('../middlewares/validate_fields');

validateResults(['msg', 'param']);

const router = Router();

router.get("/", getCompanies );

router.get("/:id",[
    check("id").isMongoId(),
    validateResults()
], getCompany );

router.post("/",[
    check("rnc").trim().not().isEmpty(),
    check("name").trim().not().isEmpty(),
    check("commercialName").trim().not().isEmpty(),
    check("paymentScheme").trim().not().isEmpty(),
    check("status").trim().not().isEmpty(),
    check("economicActivity").trim().not().isEmpty(),
    check("governmentBranch").trim().not().isEmpty(),
    validateResults()
], createCompany );

router.put("/:id",[
    check("id").isMongoId(),
    check("rnc").trim().not().isEmpty(),
    check("name").trim().not().isEmpty(),
    check("commercialName").trim().not().isEmpty(),
    check("paymentScheme").trim().not().isEmpty(),
    check("status").trim().not().isEmpty(),
    check("economicActivity").trim().not().isEmpty(),
    check("governmentBranch").trim().not().isEmpty(),
    validateResults()
], updateCompany );

router.delete("/:id",[
    check("id").isMongoId(),
    validateResults()
], deleteCompany );



module.exports = router;