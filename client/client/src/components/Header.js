import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

const Header = () => {
  const { user, updateAuthStatus } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  console.log('Пользователь в Header:', user); // Лог для проверки

  const handleLogout = () => {
    updateAuthStatus(null);
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/home" style={styles.logo}>
          Магазин
        </Link>
        <nav style={styles.nav}>
          {user ? (
            <>
              <Link to="/home" style={styles.navLink}>
                Главная
              </Link>
              <Link to="/products" style={styles.navLink}>
                Каталог
              </Link>
              <Link to="/cart" style={styles.navLink}>
                Корзина ({cartItems.length})
              </Link>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/register" style={styles.navLink}>
                Регистрация
              </Link>
              <Link to="/login" style={styles.navLink}>
                Вход
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

// Стили
const styles = {
  header: {
    background: 'linear-gradient(135deg, #1e90ff, #00bfff)', // Градиентный фон
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Тень
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px', // Ограничение ширины контейнера
    margin: '0 auto', // Центрирование контейнера
  },
  logo: {
    fontSize: '1.5rem',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px', // Расстояние между ссылками
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s', // Плавное изменение цвета
  },
  navLinkHover: {
    color: '#b3e0ff', // Светло-голубой цвет при наведении
  },
};

export default Header;