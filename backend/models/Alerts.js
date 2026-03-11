const { DataTypes } = require("sequelize")
const sequelize = require("../db/db")

const Alert = sequelize.define("Alert",{

id:{
type:DataTypes.INTEGER,
primaryKey:true,
autoIncrement:true
},

message:{
type:DataTypes.STRING
},

latitude:{
type:DataTypes.FLOAT
},

longitude:{
type:DataTypes.FLOAT
}

},{
tableName:"alerts",
timestamps:true
})

module.exports = Alert