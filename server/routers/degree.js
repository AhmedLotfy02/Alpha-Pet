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
router.get('/vetemail/:vetEmail', getDegreesOfVet);
router.get('/degree/:year/:college/:name/:email', getDegree);
router.post(
    '/',
    auth,
    body('vetEmail').isEmail().normalizeEmail(),
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('degreeYear').isInt(),
    body('collegeName').not().isEmpty(),
    body('degreeName').not().isEmpty(),
    createDegree
);
router.patch(
    '/', 
    auth,
    body('vetEmail').isEmail().normalizeEmail(),
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('degreeYear').isInt(),
    body('collegeName').not().isEmpty(),
    body('degreeName').not().isEmpty(),
    updateDegree
);
router.delete(
    '/', 
    auth, 
    body('vetEmail').isEmail().normalizeEmail(),
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('degreeYear').isInt(),
    body('collegeName').not().isEmpty(),
    body('degreeName').not().isEmpty(),
    deleteDegree
);

module.exports = router;