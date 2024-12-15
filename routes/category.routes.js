import express from "express";
// import { isLoggedIn } from "../middleware/auth.js";
import {viewCategory, addCategory, deleteCategory, updateCategoryAction, bulkAdd} from "../controller/category.controller.js";
const router = express.Router();


router.get('/view-category',  viewCategory);
router.post('/add-category',  addCategory);
router.delete('/:c_name', deleteCategory);
router.put('/:c_name',updateCategoryAction);
router.post('/bulk-add',bulkAdd);


export default router;