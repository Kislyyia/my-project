import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CartAPIContext } from '../contexts/CartAPIProvider';  // Исправьте путь

import { AuthContext } from '../contexts/AuthContext'; // Импортируем AuthContext

const OrderPage = () => {
  const { cartItems, clearCart } = useContext(CartAPIContext);
  const { user } = useContext(AuthContext); // Получаем текущего пользователя
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Проверяем, что пользователь авторизован
      if (!user || !user.id) {
        setError('Пользователь не авторизован');
        return;
      }
  
      // Проверяем, что все поля заполнены
      if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.deliveryAddress) {
        setError('Пожалуйста, заполните все поля');
        return;
      }
  
      // Проверяем, что cartItems существует и является массивом
      const totalPrice = Array.isArray(cartItems)
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;
  
      // Логирование данных перед отправкой
      console.log('Данные для отправки:', {
        ...formData,
        totalPrice,
        items: cartItems,
        user_id: user.id,
      });
  
      // Отправка заказа на сервер
      const response = await axios.post('http://localhost:5020/api/orders', {
        ...formData,
        totalPrice,
        items: cartItems,
        user_id: user.id,
      });
  
      if (response.status === 201) {
        alert('Заказ успешно оформлен!');
        clearCart(); // Очищаем корзину после успешного оформления заказа
      }
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      setError('Произошла ошибка при оформлении заказа.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Оформление заказа</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="customerName"
          placeholder="Имя клиента"
          value={formData.customerName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="customerEmail"
          placeholder="Email"
          value={formData.customerEmail}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="customerPhone"
          placeholder="Телефон"
          value={formData.customerPhone}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="deliveryAddress"
          placeholder="Адрес доставки"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Оформить заказ
        </button>
      </form>
    </div>
  );
};
// Стили
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#e6f7ff', // Светло-голубой фон
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#1e90ff', // Яркий голубой цвет для заголовка
  },
  error: {
    color: '#ff6b6b', // Красный цвет для ошибок
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff', // Белый фон для формы
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Тень
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #b3e0ff', // Светло-голубой бордер
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'border-color 0.3s', // Плавное изменение цвета бордера
  },
  inputFocus: {
    borderColor: '#1e90ff', // Яркий голубой бордер при фокусе
  },
  button: {
    width: '100%',
    padding: '10px',
    background: 'linear-gradient(135deg, #1e90ff, #00bfff)', // Градиентный фон
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s', // Плавные переходы
  },
  buttonHover: {
    background: 'linear-gradient(135deg, #0077cc, #00aaff)', // Градиент при наведении
    transform: 'scale(1.05)', // Увеличение кнопки при наведении
  },
};

export default OrderPage;