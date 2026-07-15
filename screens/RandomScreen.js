import { useState, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { randomStyles as styles } from '../styles/styles';
import authFetch from '../utils/authFetch';

export default function RandomScreen({ route, navigation }) {
    const { userId } = route.params;
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavourite, setIsFavourite] = useState(false);

    // fetch a new random meal every time screen is opened
    useFocusEffect(
        useCallback(() => {
            fetchRandomMeal();
        }, [])
    );

    const fetchRandomMeal = async () => {
        setLoading(true);
        setIsFavourite(false);
        try {
            const response = await fetch(
                'https://www.themealdb.com/api/json/v1/1/random.php'
            );
            const data = await response.json();
            const randomMeal = data.meals[0];
            setMeal(randomMeal);

            // check if already favourited
            if (userId) {
                const favResponse = await authFetch(
                    `http://192.168.56.1:3000/favourites/${userId}`
                );
                const favData = await favResponse.json();
                const alreadySaved = favData.some(
                    fav => fav.meal_id === randomMeal.idMeal
                );
                setIsFavourite(alreadySaved);
            }
        } catch (error) {
            alert('Could not load random recipe');
        }
        setLoading(false);
    };

    const toggleFavourite = async () => {
        if (!userId) {
            alert('Please log in to save favourites');
            return;
        }
        if (isFavourite) {
            await authFetch('http://192.168.56.1:3000/favourites', {
                method: 'DELETE',
                body: JSON.stringify({ userId, mealId: meal.idMeal }),
            });
            setIsFavourite(false);
        } else {
            await authFetch('http://192.168.56.1:3000/favourites', {
                method: 'POST',
                body: JSON.stringify({
                    userId,
                    mealId: meal.idMeal,
                    mealName: meal.strMeal,
                    mealThumb: meal.strMealThumb,
                }),
            });
            setIsFavourite(true);
        }
    };

    const getIngredients = (meal) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push(`${measure?.trim()} ${ingredient.trim()}`);
            }
        }
        return ingredients;
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#7d9469" />
                <Text style={styles.loadingText}>Finding something delicious...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* Meal Image */}
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

            {/* Badge */}
            <View style={styles.badge}>
                <Text style={styles.badgeText}>🎲 Random Recipe</Text>
            </View>

            <View style={styles.content}>

                {/* Title Row */}
                <View style={styles.titleRow}>
                    <Text style={[styles.title, { flex: 1 }]}>{meal.strMeal}</Text>
                    <TouchableOpacity onPress={toggleFavourite} style={styles.heartButton}>
                        <Text style={styles.heartEmoji}>{isFavourite ? '❤️' : '🤍'}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.meta}>{meal.strCategory} • {meal.strArea}</Text>

                {/* Shuffle Button */}
                <TouchableOpacity style={styles.shuffleButton} onPress={fetchRandomMeal}>
                    <Text style={styles.shuffleText}>🔀  Shuffle Again</Text>
                </TouchableOpacity>

                {/* Ingredients */}
                <Text style={styles.sectionTitle}>Ingredients</Text>
                <View style={styles.ingredientsGrid}>
                    {getIngredients(meal).map((item, index) => (
                        <View key={index} style={styles.ingredientChip}>
                            <Text style={styles.ingredientText}>{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Instructions */}
                <Text style={styles.sectionTitle}>Instructions</Text>
                {meal.strInstructions
                    .split('\r\n')
                    .filter(step => step.trim())
                    .map((step, index) => (
                        <View key={index} style={styles.stepRow}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>{index + 1}</Text>
                            </View>
                            <Text style={styles.stepText}>{step.trim()}</Text>
                        </View>
                    ))}

                {/* Bottom shuffle button */}
                <TouchableOpacity
                    style={styles.shuffleButtonBottom}
                    onPress={fetchRandomMeal}
                >
                    <Text style={styles.shuffleText}>🔀  Try Another Recipe</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}