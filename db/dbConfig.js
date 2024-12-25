import mongoose from 'mongoose';
const connection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Productdb');

    console.log('mongodb connected');
  } catch (err) {
    console.log('Error while connecting to the mongodb: ' + err);
  }
};

export default connection;
