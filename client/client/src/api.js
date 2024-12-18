import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // URL вашего сервера

// Получение всех товаров
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// Получение всех категорий
export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

// Создание заказа
export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}/orders`, orderData);
  return response.data;
};