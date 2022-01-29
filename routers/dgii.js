const { Router } = require("express");
const { getCompanyInformationByRNC } = require('../controllers')
const { check } = require('express-validator');
const { validateResults } = require('../middlewares/validate_fields');


// validateResults(['msg', 'param']);

const router = Router();

router.get("/:rnc",[
    check("rnc").trim().not().isEmpty(),
    validateResults(['msg', 'param'])
], getCompanyInformationByRNC );



module.exports = router;