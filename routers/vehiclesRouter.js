const express = require('express')
const vehiclesBL = require('../BLs/vehiclesBL');

const router = express.Router();

router.get('/',async (req,resp) => {
    const data = await vehiclesBL.getVehiclesData();
    return resp.json(data);
})

router.post('/polygon', async (req,resp) => {
    const data = await vehiclesBL.getVehiclesInPolygons(req.body)
    return resp.json(data);
})

module.exports = router