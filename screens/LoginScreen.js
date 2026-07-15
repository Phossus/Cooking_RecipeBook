import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, TouchableOpacity, Touchable } from 'react-native';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import authFetch from '../utils/authFetch';
import BASE_URL from '../utils/config';



export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
    console.log('Attempting login to:', `${BASE_URL}/login`);      
    try {
        const response = await fetch(`${BASE_URL}/login`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if(response.ok) {
            alert('Welcome Back, ' + data.name);
            await SecureStore.setItemAsync('token', data.token);
            await SecureStore.setItemAsync('userId', String(data.userId));
            navigation.navigate('Home', { userId: data.userId, userName: data.name });
        }
        else {
            alert(data.message);
        }
    }
    catch(error) {
        alert('Could not connect to the server');
    }};

    return (
        <View style={styles.container}>
            <Image source={require('./../assets/icon2.png')} style={styles.logo}/>

            <Text style ={styles.title}>Welcome Back</Text>
            <Text style ={styles.subtitle}>Login to continue</Text>

            <TextInput 
            style={styles.input}
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            autoCapitalize="none"/>

            <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />

            <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <View Style={styles.singupContainer}>
                <Text style={styles.singupText}>Don't have an account?
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.singupLink}>Sign Up</Text></TouchableOpacity>
                </Text>

            </View>

            <StatusBar style='auto'/>
        </View>
    )
}

import { loginStyles as styles } from '../styles/styles';



