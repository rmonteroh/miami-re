import axios from 'axios';

const propertiesApi = axios.create({
  baseURL: '/api'
})

export default propertiesApi;