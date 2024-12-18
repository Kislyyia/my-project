const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Секретный ключ для JWT
const JWT_SECRET = 'your_jwt_secret';

// Регистрация пользователя
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Проверка, существует ли пользователь с таким email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Авторизация пользователя
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Поиск пользователя по email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Неверный email или пароль' });
      }
  
      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Неверный email или пароль' });
      }
  
      // Создание JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ message: 'Авторизация успешна', token });
    } catch (error) {
      console.error('Ошибка при входе:', error);
      res.status(500).json({ message: 'Произошла ошибка при входе' });
    }
  });

router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Проверка, существует ли пользователь с таким email
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }
  
      // Хеширование пароля
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Создание нового пользователя
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
    } catch (error) {
      console.error('Ошибка при регистрации:', error); // Логирование ошибки
      res.status(500).json({ message: 'Произошла ошибка при регистрации' });
    }
  });

module.exports = router;