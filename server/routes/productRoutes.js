// server/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');

const router = express.Router();

// Создание товара
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image_url, category_id } = req.body;

    // Проверка обязательных полей
    if (!name || !description || !price || !category_id) {
      return res.status(400).json({ message: 'Необходимо заполнить все обязательные поля' });
    }

    // Проверка существования категории
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    // Создание товара
    const newProduct = await Product.create({
      name,
      description,
      price,
      image_url,
      category_id,
    });

    res.status(201).json({ message: 'Товар успешно создан', product: newProduct });
  } catch (error) {
    console.error('Ошибка при создании товара:', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

module.exports = router;