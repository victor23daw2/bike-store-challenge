import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const getProducts = async () => {
  const response = await axios.get(`${API}/api/v1/products`);
  console.log('API URL:', API);

  return response.data;
};
