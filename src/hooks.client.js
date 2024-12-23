import { goto } from '$app/navigation';
import { getToken } from '$lib/stores/auth';

export async function handleProtectedRoute(path) {
  const token = getToken();
  
  if (!token && path.startsWith('/file_upload')) {
    goto('/login');
    return false;
  }
  
  return true;
} 