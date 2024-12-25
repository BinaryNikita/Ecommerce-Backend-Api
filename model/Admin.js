import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

 const adminSchema = mongoose.Schema( {
   

    name: {type: String,  },
    email: {type: String, unique:true, required:true},
    password: {type: String
      , set(v){
        const saltKey = bcrypt.genSaltSync(10);
        const hashedpassword = bcrypt.hashSync(v, saltKey);
        return hashedpassword;
      }
    }
},


);

const Admin = mongoose.model('Admin',adminSchema);

export default Admin;

