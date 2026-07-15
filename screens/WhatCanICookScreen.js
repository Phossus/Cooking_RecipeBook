import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
} from 'react-native';
import { whatCanICookStyles as styles } from '../styles/styles';

export default function WhatCanICookScreen({ route, navigation }) {
    const { userId } = route.params;
    const [ingredient, setIngredient] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!ingredient.trim()) {
            alert('Please enter an ingredient');
            return;
        }

        setLoading(true);
        setSearched(true);

        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.trim()}`
            );
            const data = await response.json();
            setResults(data.meals || []);
        } catch (error) {
            alert('Could not fetch recipes');
        }

        setLoading(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetail', {
                mealId: item.idMeal,
                userId,
            })}
        >
            <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
            <Text style={styles.cardTitle} numberOfLines={2}>{item.strMeal}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What Can I Cook? 🍳</Text>
            <Text style={styles.subtitle}>Enter an ingredient you have</Text>

            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="e.g. chicken, garlic, tomato..."
                    value={ingredient}
                    onChangeText={setIngredient}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Go</Text>
                </TouchableOpacity>
            </View>

            {/* suggestion chips for common ingredients */}
            <View style={styles.suggestions}>
                {['Chicken', 'Beef', 'Salmon', 'Garlic', 'Tomato', 'Egg'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={styles.suggestionChip}
                        onPress={() => setIngredient(item)}
                    >
                        <Text style={styles.suggestionText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {loading && (
                <ActivityIndicator size="large" color="#7d9469" style={{ marginTop: 20 }} />
            )}

            {!loading && searched && results.length === 0 && (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyEmoji}>🤷</Text>
                    <Text style={styles.emptyText}>No recipes found</Text>
                    <Text style={styles.emptySubtext}>
                        Try a different ingredient like "chicken" or "garlic"
                    </Text>
                </View>
            )}

            {!loading && results.length > 0 && (
                <Text style={styles.resultsCount}>
                    {results.length} recipes with {ingredient}
                </Text>
            )}

            <FlatList
                data={results}
                keyExtractor={(item) => item.idMeal}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}