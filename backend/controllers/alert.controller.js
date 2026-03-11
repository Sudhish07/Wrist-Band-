const Alert = require("../models/Alerts")

// create alert
exports.createAlert = async (req,res)=>{
try{

const {message, latitude, longitude} = req.body

const alert = await Alert.create({
message,
latitude,
longitude
})

res.status(201).json(alert)

}catch(error){
res.status(500).json({error:error.message})
}
}


// get all alerts
exports.getAlerts = async (req,res)=>{
try{

const alerts = await Alert.findAll()

res.json(alerts)

}catch(error){
res.status(500).json({error:error.message})
}
}