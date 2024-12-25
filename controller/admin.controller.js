import Admin from '../model/Admin.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

export const signInAction = async (request, response, next) => {
  let { email, password } = request.body;
  const admin = await Admin.findOne({ email });
  let dbPassword = admin.password;
  let status = await bcrypt.compare(password, dbPassword);
  if (status) {
    try {
      request.session.currentUserId = admin._id;
      request.session.currentUserEmail = admin.email;
      request.session.isLoggedIn = true;
      response.status(201).send('sign in success...');
    } catch (error) {
      console.error(error);
      response.status(401).send('Something went wrong.');
    }
  } else {
    console.log('Invalid pasword or email..........');
  }
};

export const signUpAction = async (request, response, next) => {
  let { name, email, password } = request.body;
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(401).json({ error: errors.array() });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return response.send('Unable to sign up ', {
        error: 'Email already registered.',
      });
    }
    const newAdmin = new Admin({ name, email, password });
    console.log('New Admin Object:', newAdmin);
    await newAdmin.save();
    response.status(201).send('sign up success');
  } catch (error) {
    console.error(error);
  }
};
