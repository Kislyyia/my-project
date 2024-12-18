const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// Маршрут для входа администратора
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.status(200).json({ token: 'admin_token' });
  } else {
    res.status(401).json({ message: 'Неверный логин или пароль' });
  }
});

// Маршрут для добавления товара
router.post('/productadd', async (req, res) => {
  const { name, description, price, image_url } = req.body;

  // Проверяем, что все обязательные поля переданы
  if (!name || !description || !price) {
    return res.status(400).json({ message: 'Пожалуйста, заполните все обязательные поля' });
  }

  try {
    // Создаем товар
    const product = await Product.create({
      name,
      description,
      price,
      image_url,
    });

    res.status(201).json({ message: 'Товар успешно добавлен', product });
  } catch (error) {
    console.error('Ошибка при добавлении товара:', error);
    res.status(500).json({ message: 'Ошибка при добавлении товара', error: error.message });
  }
});

module.exports = router;