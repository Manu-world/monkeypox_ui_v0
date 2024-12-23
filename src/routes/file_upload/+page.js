import { browser } from '$app/environment';
import { handleProtectedRoute } from '../../hooks.client.js';

export const ssr = false;

export async function load({ url }) {
  if (browser) {
    const canAccess = await handleProtectedRoute(url.pathname);
    if (!canAccess) {
      return {
        status: 302,
        redirect: '/login'
      };
    }
  }
} 