const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Убедитесь, что модель User импортирована

const router = express.Router();

// Маршрут для получения данных о пользователе
router.get('/me', async (req, res) => {
  try {
    // Получаем токен из заголовка
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    // Проверяем токен
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Замените на ваш секретный ключ

    // Ищем пользователя в базе данных
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Возвращаем данные пользователя
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    res.status(401).json({ message: 'Неверный токен' });
  }
});

module.exports = router;