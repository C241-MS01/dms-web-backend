const prisma = require('../prisma');

const getVehicles = async (req, res) => {
  const vehicles = await prisma.vehicle.findMany();
  res.status(200).json({
    message: "success get allVehicles",
    data: vehicles
  });
};

const getVehicleById = async (req, res) => {
  const { id } = req.params;
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  res.status(200).json({
    message: "success get vehiclebyid",
    data: vehicle
  });
};

// const createVehicle = async (req, res) => {
//   const vehicle = await prisma.vehicle.create({ data: req.body });
//   res.status(201).json({
//     message: "success create vehicle",
//     data: vehicle
//   });
// };

// const updateVehicle = async (req, res) => {
//   const { id } = req.params;
//   const vehicle = await prisma.vehicle.update({ where: { id }, data: req.body });
//   res.status(200).json({
//     message: "success update vehicle",
//     data: vehicle
//   });
// };

// const deleteVehicle = async (req, res) => {
//   const { id } = req.params;
//   await prisma.vehicle.delete({ where: { id } });
//   res.status(204).send();
// };

module.exports = { getVehicles, getVehicleById};