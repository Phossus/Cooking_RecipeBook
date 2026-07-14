import { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { categoryMealsStyles as styles } from '../styles/styles';

export default function CategoryMealsScreen({ route, navigation }) {
    const { userId, category } = route.params;
    const [loading, setLoading] = useState(true);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetchMealByCategory();
    }, []);

    const fetchMealByCategory = async () => {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );
            const data = await response.json();
            setMeals(data.meals || []);
        } catch (error) {
            alert('Could not load meals');
        }
        setLoading(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetail', { mealId: item.idMeal, userId })}
        >
            <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.strMeal}</Text>
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{category}</Text>
            <FlatList
                data={meals}
                keyExtractor={(item) => item.idMeal}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );

}