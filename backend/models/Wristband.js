const { DataTypes } = require("sequelize")
const sequelize = require("../db/db")

const Wristband = sequelize.define("Wristband",{

device_id: DataTypes.STRING,
device_name: DataTypes.STRING,
user_id: DataTypes.INTEGER

})

module.exports = Wristband