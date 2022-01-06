const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./connection.js');
const appointmentRoutes = require('./routers/appointments.js');
const clinicRoutes = require('./routers/clinic.js');
const degreeRoutes = require('./routers/degree.js');
const invoicesRoutes = require('./routers/invoices.js');
const ownersRoutes = require('./routers/owners.js');
const vetsRoutes = require('./routers/vets.js');
const pharmacistsRoutes = require('./routers/pharmacists.js');
const petsRoutes = require('./routers/pets.js');
const pharmacyRoutes = require('./routers/pharmacy.js');
const reviewsRoutes = require('./routers/reviews.js');
const medicinesRoutes = require('./routers/medicines.js');
const vetPostsRouters = require('./routers/vet_posts.js');
const pharmacistpostsRouters = require('./routers/pharmacist_posts.js');
const ownerpostsRouters = require('./routers/owner_posts.js');
const ownerCommentsRouters = require('./routers/owner_comments.js');
const vetCommentsRouters = require('./routers/vet_comments.js');
const pharmacistCommentsRouters = require('./routers/pharmacist_comments.js');

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
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

//Lotfy's Update
const path = require("path");
app.use(express.static("public"));
app.use("/images", express.static(path.join("backend/images")));		//	Error

//  end-points
app.use('/appointments', appointmentRoutes);
app.use('/clinics', clinicRoutes);
app.use('/degrees', degreeRoutes);
app.use('/invoices', invoicesRoutes);
app.use('/owners', ownersRoutes);
app.use('/vets', vetsRoutes);
app.use('/pharmacists', pharmacistsRoutes);
app.use('/pets', petsRoutes);
app.use('/pharmacy', pharmacyRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/medicines', medicinesRoutes);
app.use('/vetPosts', vetPostsRouters);
app.use('/pharmacistPosts', pharmacistpostsRouters);
app.use('/ownerPosts', ownerpostsRouters);
app.use('/ownerComments', ownerCommentsRouters);
app.use('/vetComments', vetCommentsRouters);
app.use('/pharmacistComments', pharmacistCommentsRouters);

app.use('/', (req, res) => {
    res.send('Welcome to Alpha-Pet App');
    
});


const PORT = process.env.PORT || 5000;

//  Connect to MySql server
connection.connect((err) => {
    if(err){
        throw err;
    }else{
        console.log('MySql Connected...');
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    }
});