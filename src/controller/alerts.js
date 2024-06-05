const prisma = require('../prisma');

// Retrieve 10 recent alerts
const getRecentAlerts = async (req, res) => {
    try {
        const alerts = await prisma.alert.findMany({
            orderBy: { time: 'desc' },
            take: 10,
        });
        res.json({
            status: "Success get recent alert",
            data: {
                alertId: alerts.id,
                time: alerts.time,
                vehicleId: alerts.vehicleId,
                status: alerts.status
            }
        });
    } catch (error) {
        console.error('Error fetching recent alerts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getAlerts = async (req, res) => {
    const alerts = await prisma.alert.findMany();
    res.status(200).json({
        message: "success getAllAlerts",
        data: alerts
    });
  };

// const createAlert = async (req, res) => {
//     try {
//         const { status, imgPath, time } = req.body;
//         const newAlert = await prisma.alert.create({
//             data: { time, vehicleId, status, imgPath, analysis_result },
//         });

//         res.status(201).json({
//             alertId: newAlert.alertId,
//             time: newAlert.time,
//             analysis_result: newAlert.analysis_result,
//             vehicleId: newAlert.vehicleId,
//             status: newAlert.status,
//             imgPath: newAlert.imgPath,
//             lat: newAlert.lat,
//             long: newAlert.long,
//         });
//     } catch (error) {
//         console.error('Error creating alert:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const getAlertDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const alert = await prisma.alert.findUnique({
            where: { id: id },
        });

        if(!alert) {
            return res.status(404).json({
                error: 'Alert not found'
            });
        }

        res.json({
            alertId: alert.id,
            timestamp: alert.time,
            vehicleId: alert.vehicleId,
            status: alert.status,
            imgPath: alert.imgPath,
            lat: alert.lat,
            long: alert.long,
        });
    } catch (error) {
        console.error('Error fetching alert details', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

  module.exports = { getAlerts, getRecentAlerts, getAlertDetails};