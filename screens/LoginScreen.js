import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, TouchableOpacity, Touchable } from 'react-native';
import { useState } from 'react';



export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
    try {
        const response = await fetch('http://192.168.56.1:3000/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if(response.ok) {
            alert('Welcome Back, ' + data.name);
            navigation.navigate('Home');
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
            <Image source={require('./../assets/icon.png')} style={styles.logo}/>

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

            <TouchableOpacity style={styles.forgotPassword}>
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



