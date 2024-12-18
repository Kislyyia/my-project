import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartAPIContext } from '../contexts/CartAPIProvider';  // Исправьте путь

import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { updateCart } = useContext(CartAPIContext); // Обновим корзину из контекста

  // Получение списка товаров с сервера
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5020/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      }
    };
    fetchProducts();
  }, []);

  // Добавление товара в корзину
  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:5020/api/cart', {
        productId: product.id,
        quantity: 1, // Начальное количество
      });
      if (response.status === 201) {
        updateCart(response.data); // Обновляем локальное состояние корзины
        alert(`${product.name} добавлен в корзину`);
      }
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error);
      alert('Не удалось добавить товар в корзину.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Каталог товаров</h1>
      <div style={styles.productsContainer}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)} // Передаем функцию добавления в карточку
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#e6f7ff',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#1e90ff',
  },
  productsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
  },
};

export default ProductsPage;
