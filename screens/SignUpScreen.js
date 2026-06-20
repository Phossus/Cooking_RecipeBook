import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, TouchableOpacity, Touchable, ScrollView  } from 'react-native';
import { useState } from 'react';

export default function SignUpScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
        if(password != confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://192.168.56.1:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if(response.ok) {
                alert('Account succesfully created. Please Log in');
                navigation.goBack();
            }
            else {
                alert(data.message);
            }
        }
        catch (error) {
            alert('could not connect to server');
        }
    };


    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
            <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="words"/>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"/>
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} keyboardType="password" secureTextEntry/>
            <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} keyboardType="password" secureTextEntry/>
            
            <TouchableOpacity onPress={handleSignup} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.loginLink}>Log in</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>            
    )
}

import { signUpStyles as styles} from '../styles/styles';