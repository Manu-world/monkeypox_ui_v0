import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, cookies }) => {
    const token = cookies.get('authToken');
    
    if (!token) {
        throw redirect(303, '/login');
    }
    
    return {
        token
    };
}; 