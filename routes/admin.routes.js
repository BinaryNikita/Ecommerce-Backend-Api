import express from "express";
import { body } from 'express-validator';
import {signInAction} from "../controller/admin.controller.js";
import {signUpAction } from "../controller/admin.controller.js";
const router = express.Router();

router.post("/sign-in",signInAction);
router.post("/sign-up", body("name","name is required").notEmpty(),
body("email","email id is required").notEmpty(),
body("email","Not a valid email id").isEmail(),
body("password","password is required").notEmpty(),
body("password","password must be between 6 to 10").isLength({min:6, max:10}), signUpAction);

export default router;