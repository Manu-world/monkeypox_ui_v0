import axios from 'axios';
import { getToken } from '$lib/stores/auth';

const API_URL = 'http://localhost:5000/api/images/';

export async function predictImage(file, token) {
  const formData = new FormData();
  formData.append('image', file);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(`${API_URL}predict`, formData, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getUserHistory() {
  const token = getToken();

  if (!token) {
    throw new Error('No token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}history`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching user history:', error);
    throw error;
  }
}

export async function downloadUserHistoryPDF() {
  const token = getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
  };

  try {
    const response = await axios.get(`${API_URL}history/pdf`, config);
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'user_history.pdf';
    link.click();
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
}