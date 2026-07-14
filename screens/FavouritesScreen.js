import { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { favouritesStyles as styles } from '../styles/styles';
import * as SecureStore from 'expo-secure-store';
import authFetch from '../utils/authFetch';

export default function FavouritesScreen({ route, navigation }) {
    const { userId } = route.params;
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    // useFocusEffect re-fetches every time this screen becomes active
    // so if you add a favourite from RecipeDetail, it shows up when you come back here
    useFocusEffect(
        useCallback(() => {
            fetchFavourites();
        }, [])
    );

    const fetchFavourites = async () => {
        setLoading(true);
        try {
            const response = await authFetch(`http://192.168.56.1:3000/favourites/${userId}`);
            const data = await response.json();
            setFavourites(data);
        } catch (error) {
            alert('Could not load favourites');
        }
        setLoading(false);
    };

    const removeFavourite = async (mealId) => {
        try {
            await fetch('http://192.168.56.1:3000/favourites', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, mealId }),
            });
            // remove from local state immediately without re-fetching
            setFavourites(prev => prev.filter(item => item.meal_id !== mealId));
        } catch (error) {
            alert('Could not remove favourite');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetail', {
                mealId: item.meal_id,
                userId: userId,
            })}
        >
            <Image source={{ uri: item.meal_thumb }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.meal_name}</Text>
                <Text style={styles.cardDate}>
                    Saved on {new Date(item.created_at).toLocaleDateString()}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFavourite(item.meal_id)}
            >
                <Text style={styles.removeText}>❤️</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#7d9469" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Favourites</Text>

            {favourites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyEmoji}>🍽️</Text>
                    <Text style={styles.emptyText}>No favourites yet</Text>
                    <Text style={styles.emptySubtext}>
                        Tap the ❤️ on any recipe to save it here
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={favourites}
                    keyExtractor={(item) => item.meal_id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}