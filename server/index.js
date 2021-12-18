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
const vetPostsRouters = require('./routers/vet_posts');
const pharmacistpostsRouters = require('./routers/pharmacist_posts');
const ownerpostsRouters = require('./routers/owner_posts');

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

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
app.use('/vetPosts', vetPostsRouters);
app.use('/pharmacistPosts', pharmacistpostsRouters);
app.use('/ownerPosts', ownerpostsRouters);

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