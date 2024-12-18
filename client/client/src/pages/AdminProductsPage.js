import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminProductCard from '../components/AdminProductCard'; // Исправленный путь

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);

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

  // Удаление товара
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5020/api/products/${productId}`, {
        headers: {
          Authorization: 'admin_token', // Передаем токен администратора
        },
      });
      // Обновляем список товаров после удаления
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Управление товарами</h1>
      <div style={styles.productsContainer}>
        {products.map((product) => (
          <AdminProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#e6f7ff', // Светло-голубой фон
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#1e90ff', // Яркий голубой цвет для заголовка
  },
  productsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center', // Центрирование карточек товаров
  },
};

export default AdminProductsPage;