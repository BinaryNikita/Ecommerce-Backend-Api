import express, { request, response } from 'express';
import pool from '../db/dbConfig.js';
import Category from '../model/Category.js';

export const viewCategory = async (request, response, next) => {
  try {
    const categories = await Category.findAll();
    response.send(categories);
  } catch (err) {
    response.send(err);
  }
};

export const addCategory = async (request, response, next) => {
  const { c_name } = request.body;

  try {
    await Category.create({ c_name: c_name });
    response.send('category created succesfully');
  } catch (err) {
    console.error(err);
  }
};

export const deleteCategory = async (request, response, next) => {
  const c_name = request.params.c_name;

  try {
    await Category.destroy({ where: { c_name } });
    response.send('category deleted sucessfully');
  } catch (err) {
    console.error(err);
  }
};

export const updateCategoryAction = async (request, response, next) => {
  const c_name = request.params.c_name;
  const updatedc_name = request.body.updatedc_name;

  try {
    let result = await Category.update(
      { c_name: updatedc_name },
      { where: { c_name: c_name } }
    );

    if (result[0] == 0) {
      response.send('category not found');
    }
    response.send('Category updated successfully');
  } catch (err) {
    console.error(err);
    response.send('Error updating category.');
  }
};

export const bulkAdd = async (request, response, next) => {
  try {
    let result = await Category.bulkCreate(request.body);
    response.send('Data inserted successfully');
  } catch (err) {
    response.send('Some error occurred while inserting the data');
  }
};
