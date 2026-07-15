import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { recipeDetailStyles as styles } from '../styles/styles';
import * as SecureStore from 'expo-secure-store';
import authFetch from '../utils/authFetch';

export default function RecipeDetailScreen({ route, navigation }) {
    const { mealId, userId } = route.params; // gets the mealId passed from SearchScreen
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        fetchRecipeDetail();
    }, []);

    const fetchRecipeDetail = async () => {
        try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const data = await response.json();
        setMeal(data.meals[0]);

        if(userId) {
          const favResponse = await authFetch (`/favourites/${userId}`);
          const favData = await favResponse.json();
          const alreadySaved = favData.some(fav => fav.meal_id === mealId); //set wether alreadySaved is true or false based on if the meal matches
          setIsFavourite(alreadySaved);
        }

        } catch (error) {
        alert('Could not load recipe');
        }
        setLoading(false);
    };

    const toggleFavourite = async () => {
      if(!userId) {
        alert('Please Log In!');
        return;
      }

      if(isFavourite) { // remove from fav
        await authFetch('/favourites', {
          method: 'DELETE',
          body: JSON.stringify({ userId, mealId }),
        });
        setIsFavourite(false);
      } else { //add fav
        await authFetch('/favourites', {
          method: 'POST',
          body: JSON.stringify({ userId, mealId, mealName: meal.strMeal, mealThumb: meal.strMealThumb }),
        });
        setIsFavourite(true);
      }
    }


    // TheMealDB stores ingredients as strIngredient1, strIngredient2... up to 20
    // This function pulls them all out into a clean array
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
        </View>
        );
    }

      return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.titleRow}>
            <Text style={[styles.title, { flex: 1 }]}>{meal.strMeal}</Text>
            <TouchableOpacity onPress={toggleFavourite} style={styles.heartButton}>
                <Text style={styles.heartEmoji}>{isFavourite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.meta}>{meal.strCategory} • {meal.strArea}</Text>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {getIngredients(meal).map((item, index) => (
          <Text key={index} style={styles.ingredient}>• {item}</Text>
        ))}

        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}