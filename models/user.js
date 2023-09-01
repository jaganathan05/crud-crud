const Sequelize = require('sequelize');

const sequelize = require('../helpers/database');

const Users = sequelize.define('users',{
  Id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true 
  },
  Name:{ 
    type: Sequelize.STRING,
    allowNull:false
  },
  Email : {
    type: Sequelize.STRING,
    allowNull: false
  },
  PhoneNo: {
    type:Sequelize.STRING,
    allowNull:false
  },
  Date:{
    type:Sequelize.DATE,
    allowNull: false
  },
  Time:{
    type:Sequelize.TIME,
    allowNull: false
  }
})

module.exports= Users;