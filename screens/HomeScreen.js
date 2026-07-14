import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { homeStyles as styles } from '../styles/styles';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen({ route, navigation }) {
  const { userId, userName } = route.params;
  const categories = [
    { label: 'Search Recipes', emoji: '🔍', screen: 'Search', description: 'Find any meal by name' },
    { label: 'Browse Categories', emoji: '🍽️', screen: 'Categories', description: 'Explore meals by type' },
    { label: 'My Favourites', emoji: '❤️', screen: 'Favourites', description: 'Recipes you have saved' },
    { label: 'Pantry Tracker', emoji: '🧺', screen: 'Pantry', description: 'Manage your ingredients' },
    { label: 'What Can I Cook?', emoji: '🍳', screen: 'Suggestions', description: 'Based on your pantry' },
    { label: 'Random Recipe', emoji: '🎲', screen: 'Random', description: 'Surprise me!' },
  ];

    const handleLogout = async () => {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('userId');
      navigation.navigate('Login');
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Chef 👋</Text>
          <Text style={styles.subtitle}>What are we cooking today?</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Card - Random Recipe shortcut */}
      <TouchableOpacity
        style={styles.heroCard}
        onPress={() => navigation.navigate('Random')}
      >
        <Text style={styles.heroEmoji}>🎲</Text>
        <Text style={styles.heroTitle}>Feeling Adventurous?</Text>
        <Text style={styles.heroSubtitle}>Tap for a random recipe</Text>
      </TouchableOpacity>

      {/* Grid Menu */}
      <Text style={styles.sectionTitle}>What would you like to do?</Text>
      <View style={styles.grid}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen, { userId })}
          >
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}