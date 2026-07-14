import * as SecureStore from 'expo-secure-store';

const authFetch = async (url, options = {}) => {
    const token = await SecureStore.getItemAsync('token');
        console.log('Token being sent:', token);
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        },
    });
};

export default authFetch;