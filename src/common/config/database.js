import { Sequelize } from 'sequelize'
import config from "./config"

const sequelize = new Sequelize(config)
sequelize.authenticate().then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log("db connection error");
})
module.exports = sequelize;




