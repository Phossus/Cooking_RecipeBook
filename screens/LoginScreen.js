import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, TouchableOpacity, Touchable } from 'react-native';
import { useState } from 'react';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            keyboardType="password"
            secureTextEntry
            />

            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
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

