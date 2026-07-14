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
import { searchStyles as styles } from '../styles/styles';

export default function SearchScreen({route, navigation}) {
    const { userId } = route.params;
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if(!query.trim()) return;

        setLoading(true);
        setSearched(true);

        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
            );
            const data = await response.json();
            setResults(data.meals || []);
        }   catch (error) {
            alert('Could not fetch recipes');
        }
        setLoading(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('RecipeDetail', { mealId: item.idMeal, userId })}
        >
        <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
        <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.strMeal}</Text>
            <Text style={styles.cardCategory}>{item.strCategory} • {item.strArea}</Text>
        </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Search Recipes</Text>

        <View style={styles.searchBar}>
            <TextInput
            style={styles.searchInput}
            placeholder="Search by meal name..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch} // triggers search when pressing Enter on keyboard
            returnKeyType="search"
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Go</Text>
            </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#7d9469" style={{ marginTop: 20 }} />}

        {!loading && searched && results.length === 0 && (
            <Text style={styles.noResults}>No recipes found for "{query}"</Text>
        )}

        <FlatList
            data={results}
            keyExtractor={(item) => item.idMeal}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
        />
        </View>
    )
}