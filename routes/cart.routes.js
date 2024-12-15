import express from "express";
import { addToCart } from "../controller/cart.controller.js";

const router = express.Router();


router.post("/add-to-cart", addToCart)

export default router;
