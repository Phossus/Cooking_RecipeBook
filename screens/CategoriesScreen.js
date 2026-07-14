import { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { categoriesStyles as styles } from '../styles/styles';

export default function CategoriesScreen({ route, navigation }) {
    const { userId } = route.params;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/categories.php`
            );
            const data = await response.json();
            setCategories(data.categories);
        }catch (error) {
            alert("Could not load categories");
        }
        setLoading(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style = {styles.card}
            onPress={() => navigation.navigate('CategoryMeals', {
                category: item.strCategory, userId
            })}
        >
            <Image source={{ uri: item.strCategoryThumb }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.strCategory}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                    {item.strCategoryDescription}
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style = {styles.loadingContainer}>
                <ActivityIndicator size = "large" color="#7d9469"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Browse Categories</Text>
            <FlatList
                data = {categories}
                keyExtractor = {(item) => item.idCategory}
                renderItem = {renderItem}
                contentContainerStyle={{paddingBottom: 20}}
                showsVerticalScrollIndicator={false}
                />
        </View>
    );
}