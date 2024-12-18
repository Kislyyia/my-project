const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Получение всех товаров
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/// Маршрут для добавления товара
router.post('/', async (req, res) => {
    try {
      const { name, description, price, image_url } = req.body;
  
      // Создаем новый товар
      const newProduct = await Product.create({
        name,
        description,
        price,
        image_url,
      });
  
      res.status(201).json({ message: 'Товар успешно добавлен', product: newProduct });
    } catch (error) {
      console.error('Ошибка при добавлении товара:', error);
      res.status(500).json({ message: 'Произошла ошибка при добавлении товара' });
    }
  });


  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
  
      await product.destroy();
      res.status(200).json({ message: 'Товар успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
      res.status(500).json({ message: 'Ошибка при удалении товара', error });
    }
  });

module.exports = router;