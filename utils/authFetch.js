import * as SecureStore from 'expo-secure-store';
import BASE_URL from './config';

const authFetch = async (path, options = {}) => {
    const token = await SecureStore.getItemAsync('token');

    return fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        },
    });
};

export default authFetch;