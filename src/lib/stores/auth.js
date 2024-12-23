import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

export function getToken() {
  return localStorage.getItem('authToken');
}

export function createAuthStore() {
  const { subscribe, set, update } = writable({
    user: null,
    token: null,
    loading: true
  });

  return {
    subscribe,
    login: async (userData) => {
      try {
        const response = await axios.post(`${API_URL}login`, userData);
        console.log('response', response);
        const { token, user } = response.data;

        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        set({ user, token, loading: false });
        goto('/file_upload');  // Redirect to dashboard after successful login
        return { success: true, user };
      } catch (error) {
        console.error('Login failed', error);
        throw new Error(error.response?.data?.message || 'Login failed');
      }
    },
    register: async (userData) => {
      try {
        const response = await axios.post(`${API_URL}register`, userData);
        const { token, user } = response.data;

        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        set({ user, token, loading: false });
        goto('/file_upload');  // Redirect to dashboard after successful registration
        return { success: true, user };
      } catch (error) {
        console.error('Registration failed', error);
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
    },
    logout: async () => {
      try {
        // Optional: Call backend logout if needed
        await axios.post(`${API_URL}logout`, {}, {
          headers: { 
            Authorization: `Bearer ${getToken()}` 
          }
        });
      } catch (error) {
        console.error('Logout failed', error);
      } finally {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        set({ user: null, token: null, loading: false });
        goto('/');  // Redirect to home/login page
      }
    },
    initialize: () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('authToken');

      if (storedUser && storedToken) {
        set({
          user: JSON.parse(storedUser),
          token: storedToken,
          loading: false
        });
      } else {
        set({ user: null, token: null, loading: false });
      }
    }
  };
}

export const authStore = createAuthStore();