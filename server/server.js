require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models/index');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5020;

// Подключение middleware
app.use(bodyParser.json());

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:64895', // Укажите источник запросов
  credentials: true, // Если используются куки
}));

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

// Маршруты
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter); // Подключаем маршрут для заказов
app.use('/api/auth', authRouter);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);

// Синхронизация базы данных и запуск сервера
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});