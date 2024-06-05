// external imports
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

//Port declaration and app instantiation
const PORT = process.env.PORT || 8080;
const app = express();

// Declare usage of module in express app instance
app.use(cors());
app.use(express.json());
 
const alertsRoutes = require('./routes/alert.js');
const analysisRoutes = require('./routes/analysis_res.js');
const authenticationToken = require('./middleware/auth.js');
const authRoutes = require('./routes/authRoutes.js');
const vehicleRoutes = require('./routes/vehicle.js');


app.use('/vehicles', vehicleRoutes);
app.use('/analysis_results', analysisRoutes);
app.use('/alerts', alertsRoutes); //yg bner


app.use('/auth/login',  authRoutes);
app.use('/auth/register', authRoutes);




// //akses video analysis
// //app.use('/', express.static('public/videos'));


app.listen(PORT, () => {
    console.log(`server running in ${PORT}`);
  });
