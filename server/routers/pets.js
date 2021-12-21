const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getAllPets,
    getPetOfOwner,
    getPetsWithColor,
    getPetsWithAge,
    createPet,
    updatePet,
    deletePet
} = require('../controllers/pets.js');

const router = express.Router();

router.get('/', getAllPets);
router.get('/owner/:ownerEmail', getPetOfOwner);
router.get('/color/:color', getPetsWithColor);
router.get('/age/:age', getPetsWithAge);
router.post(
    '/',
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('petName').notEmpty(),
    body('color').notEmpty(),
    body('age').notEmpty(),
    createPet
);
router.patch(
    '/',
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('petName').notEmpty(),
    body('color').notEmpty(),
    body('age').notEmpty(),
    updatePet
);
router.delete(
    '/',
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    deletePet
);

module.exports = router;