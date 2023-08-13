import axios from 'axios';
import { API_KEY, BASE_URL,TOKEN } from '../config';

export const GET = async (url) => {
  const API_URL = `${BASE_URL}${url}`;
  
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios(API_URL, config);
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};
