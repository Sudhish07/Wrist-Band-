const { DataTypes } = require("sequelize")
const sequelize = require("../db/db")

const Alert = sequelize.define("Alert",{

device_id: DataTypes.STRING,
user_id: DataTypes.INTEGER,
alert_type: DataTypes.STRING,
message: DataTypes.STRING

})

module.exports = Alert