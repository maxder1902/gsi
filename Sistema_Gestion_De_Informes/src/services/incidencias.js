import axios from "axios";

const API_URL = 'http://localhost:1337/api/incidencias';

export const getIncidencias = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};