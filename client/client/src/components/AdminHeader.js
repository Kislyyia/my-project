import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>Админ-панель</h1>
        <nav style={styles.nav}>
          <Link to="/admin/dashboard" style={styles.link}>
            Добавить товар
          </Link>
          <Link to="/admin/products" style={styles.link}>
            Управление товарами
          </Link>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: 'linear-gradient(135deg, #1e90ff, #00bfff)', // Градиентный фон
    color: '#fff',
    padding: '1rem 2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Тень
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
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s', // Плавное изменение цвета
  },
};

export default AdminHeader;