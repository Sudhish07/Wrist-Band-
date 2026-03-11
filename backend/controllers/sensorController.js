const SensorData = require("../models/SensorData");

exports.getLatest = async (req,res)=>{

const data = await SensorData.findOne({
order:[["createdAt","DESC"]]
});

res.json(data);

};

exports.create = async (req,res)=>{

const {heart_rate,spo2,latitude,longitude,status} = req.body;

const data = await SensorData.create({
heart_rate,
spo2,
latitude,
longitude,
status
});

res.json(data);

};