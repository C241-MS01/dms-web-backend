const express = require('express')
const router = express.Router();
const vehicleController = require('../controller/vehicle');

// router.post('/vehicle', vehicleController.createVehicle);

router.get('/all', vehicleController.getVehicles);
router.get('/:id', vehicleController.getVehicleById);

module.exports = router;