import axios from 'axios';

const userAPI = axios.create({
  baseURL: `https://zmstore-backend.vercel.app/api/user`,
});

const productAPI = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/product`,
});

const orderAPI = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/order`,
});

const PayPalAPI = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/paypal`,
});

export { userAPI, productAPI, orderAPI, PayPalAPI };
