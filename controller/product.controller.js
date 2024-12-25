import express, { request, response } from 'express';
import Product from '../model/Product.js';


export const viewProduct = async (request, response, next) => {
  try {
    const products = await Product.find();
    response.json({ product: products });
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = async (request, response, next) => {
  try {
    const newProduct = await Product.create(request.body);
    response.status(201).json(newProduct);
    console.log('Item added successfully');
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Failed to create product' });
  }
};

export const deleteProduct = async (request, response, next) => {
  let id = request.params.id;
  try {
    const deleteProduct = await Product.deleteOne({ id });
    response.json('Product deleted succesfully');
  } catch (err) {
    response.send(err);
  }
};

export const updateProductAction = async (request, response, next) => {
  let id = request.params.id;
  try {
    const { title, stock, ...OtherFields } = request.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        title,
        stock,
        ...OtherFields,
      },
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return response.status(404).json({ error: 'Product not found' });
    } else {
      response.status(201).json(updatedProduct);
      response.send('Item updated successfully');
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Failed to create product' });
  }
};

export const bulkAdd = async (request, response, next) => {
  try {
    await Product.insertMany(request.body.products);
    response.send('Product created succesfully');
  } catch (err) {
    response.send('Error while inserting data');
  }
};
