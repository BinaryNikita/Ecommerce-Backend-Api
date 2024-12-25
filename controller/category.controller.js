import Category from '../model/Category.js';

export const viewCategory = async (request, response, next) => {
  try {
    const categories = await Category.find();
    response.json(categories);
  } catch (err) {
    response.status(500).send('Error fetching categories');
  }
};

export const addCategory = async (request, response, next) => {
  try {
    await Category.create(request.body);
    response.send('Category created successfully');
  } catch (err) {
    console.error(err);
    response.status(500).send('Error creating category');
  }
};

export const deleteCategory = async (request, response, next) => {
  const id = request.params;

  try {
    await Category.deleteOne({  _id: id });
    response.send('Category deleted successfully');
  } catch (err) {
    console.error(err);
    response.status(500).send('Error deleting category');
  }
};

export const updateCategoryAction = async (request, response, next) => {
  const  id  = request.params.id;
  const { updatedc_name } = request.body;

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id },
      { name: updatedc_name },
      { new: true }
    );

    if (!updatedCategory) {
      return response.status(404).send('Category not found');
    }

    response.send('Category updated successfully');
  } catch (err) {
    console.error(err);
    response.status(500).send('Error updating category');
  }
};

export const bulkAdd = async (request, response, next) => {
  try {
    await Category.insertMany(request.body);
    response.send('Data inserted successfully');
  } catch (err) {
    response.status(500).send('Error while inserting data');
  }
};

