import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartAPIContext } from '../contexts/CartAPIProvider';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const { fetchCart, clearCart, removeFromCart } = useContext(CartAPIContext); // Используем только CartAPIContext
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartItems = async () => {
      const items = await fetchCart();
      setCartItems(items || []);
    };
    loadCartItems();
  }, [fetchCart]);

  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCartItems([]);
    } catch (error) {
      console.error('Ошибка при очистке корзины:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const userId = 1; // Здесь можно получить id пользователя через контекст
      const orderData = { userId, address, paymentMethod };
      const response = await axios.post('http://localhost:5020/api/orders', orderData);

      if (response.status === 201) {
        navigate(`/order/${response.data.order.id}`);
      }
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
    }
  };

  return (
    <div>
      <h1>Корзина</h1>
      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h3>{item.product.name}</h3>
              <p>Количество: {item.quantity}</p>
              <p>Цена: ${item.product.price * item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Удалить</button>
            </div>
          ))}
          <h2>Итого: ${cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)}</h2>

          <div>
            <h3>Доставка</h3>
            <input
              type="text"
              placeholder="Введите адрес доставки"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <h3>Способ оплаты</h3>
            <select onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
              <option value="credit">Кредитная карта</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <button onClick={handleCheckout}>Оформить заказ</button>
          <button onClick={handleClearCart}>Очистить корзину</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;

