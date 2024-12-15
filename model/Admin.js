import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

 const Admin = sequelize.define('Admin',  {
    user_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },

    name: {type: DataTypes.STRING },
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING,
      set(v){
        const saltKey = bcrypt.genSaltSync(10);
        const hashedpassword = bcrypt.hashSync(v, saltKey);
         this.setDataValue('password', hashedpassword);
      }
    }
},
{
    timestamps: false,
},

);


export default Admin;

