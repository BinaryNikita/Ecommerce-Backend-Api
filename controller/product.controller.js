import express, { request, response } from 'express';
import Product from '../model/Product.js';
import { where } from 'sequelize';

export const viewProduct = async (request, response, next) => {
  try {
    const products = await Product.findAll();
    response.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = async (request, response, next) => {

    try {
      const { title, stock, ...OtherFields} = request.body;
      const newProduct = await Product.create({ 
        title,  
        stock, 
        ...OtherFields 
      });
      response.status(201).json(newProduct);
      console.log("Item added successfully");
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: 'Failed to create product' });
    }
  };



export const deleteProduct = async (request, response, next) => {
  let p_id = request.params.p_id;
  try {
    const deleteProduct = await Product.destroy({ where: { p_id } });
    response.json('Product deleted succesfully');
  } catch (err) {
    response.send(err);
  }
};

export const updateProductAction = async (request, response, next) => {
  let p_id = request.params.p_id;
  try {
    const { title, stock, ...OtherFields} = request.body;
    const updatedProduct = await Product.update({ 
      title, 
      stock, 
      ...OtherFields 
    }, {where: {p_id}});

    if (updatedProduct[0] === 0) {
      return response.status(404).json({ error: 'Product not found' });
    } else{
      
          response.status(201).json(updatedProduct);
          response.send("Item updated successfully");

    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Failed to create product' });
  }
};

export const bulkAdd = async (request, response, next) => {

  try{
    const result = Product.bulkCreate(request.body.products);
    response.send("Product created succesfully");
  } catch(err){
    response.send("Error while inserting data");
  }
}
