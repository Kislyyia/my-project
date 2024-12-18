import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartAPIContext } from '../contexts/CartAPIProvider'; // Заменили на CartAPIContext

const UserHeader = () => {
  const { cartItems } = useContext(CartAPIContext); // Получаем данные корзины из контекста

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>Магазин</h1>
        <nav style={styles.nav}>
          <Link to="/home" style={styles.navLink}>Главная</Link>
          <Link to="/products" style={styles.navLink}>Каталог</Link>
          <Link to="/cart" style={styles.navLink}>
            Корзина ({cartItems.length}) {/* Теперь показываем количество товаров в корзине */}
          </Link>
          <button onClick={handleLogout} style={styles.logoutButton}>Выйти</button>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: 'linear-gradient(135deg, #1e90ff, #00bfff)',
    color: '#fff',
    padding: '1rem 2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
};

export default UserHeader;
