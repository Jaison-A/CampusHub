import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// const API = axios.create({
//   baseURL: `https://campushub-api-sv12.onrender.com/api`,
// });

export default API;
// https://campushub-api-sv12.onrender.com
