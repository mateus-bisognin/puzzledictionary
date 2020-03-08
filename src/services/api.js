import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.dicionario-aberto.net/ss_search',
});

export default api;
