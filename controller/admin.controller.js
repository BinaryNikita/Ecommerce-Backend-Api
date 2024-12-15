import express, { request, response } from 'express';
import Admin from '../model/Admin.js';
import bcrypt from 'bcrypt';
import {validationResult}from 'express-validator';

export const signInAction = async (request, response, next) => {
  let { email, password } = request.body;
  const admin = await Admin.findOne({ where: { email } });
  let dbPassword = admin.password;
  let status = bcrypt.compareSync(password, dbPassword);
  if (status) {
    try {
      request.session.currentUserId = admin.user_id;
      request.session.currentUserEmail = admin.email;
      request.session.isLoggedIn = true;
      response.send('sign in success...');
    } catch (error) {
      console.error(error);
      response.send('Something went wrong.');
    }
  } else {
    console.log('Invalid pasword or email..........');
  }
};

export const signOutAction = (request, response) => {
  request.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.send('unable to sign out');
    } else {
      response.send('sign out success');
    }
  });
};

export const signUpAction = async (request, response, next) => {
  let { name, email, password } = request.body;

const errors = validationResult(request);

if(!errors.isEmpty()){
  return response.status(401).json({error: errors.array()});
}

  try {
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return response.send('Unable to sign up ', {
        error: 'Email already registered.',
      });
    }
    await Admin.create({ name, email, password });
    response.send('sign up success');
  } catch (error) {
    console.error(error);
  }
};
