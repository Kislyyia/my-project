// orderRoutes.js
const express = require('express');
const Order = require('./models/Order');
const Cart = require('./models/Cart');
const router = express.Router();

router.post('/orders', async (req, res) => {
  const { userId, address, paymentMethod } = req.body;

  try {
    // Получаем товары из корзины пользователя
    const cartItems = await Cart.findAll({
      where: { userId },
      include: 'Product', // Предполагаем, что есть связь с моделью Product
    });

    // Если корзина пуста
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Корзина пуста' });
    }

    // Создаем заказ
    const order = await Order.create({
      userId,
      deliveryAddress: address,
      paymentMethod,
      totalPrice: cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0),
      status: 'pending', // Статус по умолчанию
    });

    // Сохраняем товары заказа
    for (let item of cartItems) {
      await order.addProduct(item.productId, { through: { quantity: item.quantity } });
    }

    // Очищаем корзину после оформления заказа
    await Cart.destroy({ where: { userId } });

    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при оформлении заказа' });
  }
});

module.exports = router;
