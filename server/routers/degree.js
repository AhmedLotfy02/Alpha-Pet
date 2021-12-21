const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getAllDegrees,
    getDegreesOfYear,
    getDegreesOfCollege,
    getDegreesWithName,
    getDegreesOfVet,
    getDegree,
    createDegree,
    updateDegree,
    deleteDegree
} = require('../controllers/degree.js');

const router = express.Router();

router.get('/', getAllDegrees);
router.get('/year/:year', getDegreesOfYear);
router.get('/college/:college', getDegreesOfCollege);
router.get('/degreename/:degreeName', getDegreesWithName);
router.get('/vet/:vetEmail', getDegreesOfVet);
router.get('/degree/:year/:college/:name/:email', getDegree);
router.post(
    '/',
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('degreeYear').isInt().notEmpty(),
    body('collegeName').notEmpty(),
    body('degreeName').notEmpty(),
    createDegree
);
router.patch(
    '/', 
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('degreeYear').isInt().notEmpty(),
    body('collegeName').notEmpty(),
    body('degreeName').notEmpty(),
    updateDegree
);
router.delete(
    '/', 
    auth, 
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('degreeYear').isInt().notEmpty(),
    body('collegeName').notEmpty(),
    body('degreeName').notEmpty(),
    deleteDegree
);

module.exports = router;