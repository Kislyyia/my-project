import React from 'react';

const AdminProductCard = ({ product, onDelete }) => {
  return (
    <div style={styles.productCard}>
      <img src={product.image_url} alt={product.name} style={styles.image} />
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.description}>{product.description}</p>
      <p style={styles.price}>Цена: ${product.price}</p>
      <button style={styles.deleteButton} onClick={() => onDelete(product.id)}>
        Удалить
      </button>
    </div>
  );
};

const styles = {
  productCard: {
    border: '1px solid #b3e0ff', // Светло-голубой бордер
    padding: '1rem',
    width: '200px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Тень
    backgroundColor: '#f0f8ff', // Очень светлый голубой фон
    marginBottom: '1rem',
    transition: 'transform 0.3s, box-shadow 0.3s', // Анимация при наведении
  },
  productCardHover: {
    transform: 'scale(1.05)', // Увеличение карточки при наведении
    boxShadow: '0 6px 12px rgba(30, 144, 255, 0.2)', // Более выраженная тень
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  name: {
    fontSize: '1.2rem',
    margin: '0.5rem 0',
    color: '#1e90ff', // Яркий голубой цвет для названия
  },
  description: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '0.5rem',
  },
  price: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Красный цвет для кнопки удаления
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s', // Анимация при наведении
  },
  deleteButtonHover: {
    backgroundColor: '#c82333', // Темно-красный цвет при наведении
    transform: 'scale(1.05)', // Увеличение кнопки при наведении
  },
};

export default AdminProductCard;