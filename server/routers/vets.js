const express = require('express');
const { body } = require('express-validator');
//app.use(express.json());
const auth = require('../middlewares/auth');
//app.use(express.static("public"));
//app.use("/images", express.static(path.join("backend/images")));		//	Error
const path = require("path");


const {
    getAllVets,
    signin,
    signup,
    updateVet,
    getVetByEmail,
    updatePassofVet
} = require('../controllers/vets.js');

const router = express.Router();

router.use("/images", express.static(path.join("backend/images")));
router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

const multer = require("multer");
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name +"."+ ext);
    },
});



router.get('/', getAllVets);
router.post(
    '/signin',
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    signin
);
router.post(
    '/signup'
    ,

    multer({ storage: storage }).single("image"),

    // body('email').isEmail().normalizeEmail(),
    // body('password').notEmpty(),
    // body('fName').notEmpty(),
    // body('lName').notEmpty(),
    signup
);
router.post('/getVetByEmail',getVetByEmail);
// router.post('/hamdy',(req,res,next)=>{
//     console.log(req.body);
// })

router.post('/updatePassofVet',updatePassofVet);

router.patch(
    '/update',
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    body('fName').notEmpty(),
    body('lName').notEmpty(),
    updateVet
);

module.exports = router;