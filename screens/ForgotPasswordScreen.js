import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import BASE_URL from '../utils/config';
import { forgotPasswordStyles as styles } from '../styles/styles';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!email.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            alert('Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Password updated successfully! Please log in.');
                navigation.goBack();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Could not connect to server');
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backText}>← Back to Login</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
                Enter your email and choose a new password
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleReset}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Reset Password</Text>
                )}
            </TouchableOpacity>

        </View>
    );
}