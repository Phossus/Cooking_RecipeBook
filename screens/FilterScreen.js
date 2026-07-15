import { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { filterStyles as styles } from '../styles/styles';

export default function FilterScreen({ route, navigation }) {
    const { userId } = route.params;

    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingFilters, setLoadingFilters] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        fetchFilters();
    }, []);

    const fetchFilters = async () => {
        try {
            // fetch categories and areas at the same time
            const [catResponse, areaResponse] = await Promise.all([
                fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
                fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'),
            ]);
            const catData = await catResponse.json();
            const areaData = await areaResponse.json();
            setCategories(catData.meals || []);
            setAreas(areaData.meals || []);
        } catch (error) {
            alert('Could not load filters');
        }
        setLoadingFilters(false);
    };

    const handleFilter = async () => {
        if (!selectedCategory && !selectedArea) {
            alert('Please select at least one filter');
            return;
        }

        setLoading(true);
        setSearched(true);

        try {
            let meals = [];

            if (selectedCategory && selectedArea) {
                // filter by both — fetch each separately then find common meals
                const [catResponse, areaResponse] = await Promise.all([
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`),
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`),
                ]);
                const catData = await catResponse.json();
                const areaData = await areaResponse.json();

                const catMeals = catData.meals || [];
                const areaMeals = areaData.meals || [];

                // find meals that appear in both lists
                const areaIds = new Set(areaMeals.map(m => m.idMeal));
                meals = catMeals.filter(m => areaIds.has(m.idMeal));

            } else if (selectedCategory) {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
                );
                const data = await response.json();
                meals = data.meals || [];

            } else if (selectedArea) {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
                );
                const data = await response.json();
                meals = data.meals || [];
            }

            setResults(meals);
        } catch (error) {
            alert('Could not fetch results');
        }

        setLoading(false);
    };

    const clearFilters = () => {
        setSelectedCategory(null);
        setSelectedArea(null);
        setResults([]);
        setSearched(false);
    };

    const renderMealItem = ({ item }) => (
        <TouchableOpacity
            style={styles.mealCard}
            onPress={() => navigation.navigate('RecipeDetail', {
                mealId: item.idMeal,
                userId,
            })}
        >
            <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
            <Text style={styles.mealTitle} numberOfLines={2}>{item.strMeal}</Text>
        </TouchableOpacity>
    );

    if (loadingFilters) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#7d9469" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Filter Recipes 🎛️</Text>

                {/* Category Filter */}
                <Text style={styles.sectionLabel}>Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                    {categories.map((item, index) => (
                        <TouchableOpacity
                            key={`category-${item.strCategory}-${index}`}  
                            style={[
                                styles.chip,
                                selectedCategory === item.strCategory && styles.chipSelected
                            ]}
                            onPress={() =>
                                setSelectedCategory(
                                    selectedCategory === item.strCategory ? null : item.strCategory
                                )
                            }
                        >
                            <Text style={[
                                styles.chipText,
                                selectedCategory === item.strCategory && styles.chipTextSelected
                            ]}>
                                {item.strCategory}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Area/Cuisine Filter */}
                <Text style={styles.sectionLabel}>Cuisine</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                    {areas.map((item, index) => (
                        <TouchableOpacity
                            key={`area-${item.strArea}-${index}`}  
                            style={[
                                styles.chip,
                                selectedArea === item.strArea && styles.chipSelected
                            ]}
                            onPress={() =>
                                setSelectedArea(
                                    selectedArea === item.strArea ? null : item.strArea
                                )
                            }
                        >
                            <Text style={[
                                styles.chipText,
                                selectedArea === item.strArea && styles.chipTextSelected
                            ]}>
                                {item.strArea}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Active filters summary */}
                {(selectedCategory || selectedArea) && (
                    <View style={styles.activeFilters}>
                        <Text style={styles.activeFiltersText}>
                            Filtering by: {[selectedCategory, selectedArea].filter(Boolean).join(' + ')}
                        </Text>
                        <TouchableOpacity onPress={clearFilters}>
                            <Text style={styles.clearText}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Search Button */}
                <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
                    <Text style={styles.filterButtonText}>Apply Filters</Text>
                </TouchableOpacity>

                {/* Results */}
                {loading && (
                    <ActivityIndicator size="large" color="#7d9469" style={{ marginTop: 20 }} />
                )}

                {!loading && searched && results.length === 0 && (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyEmoji}>🍽️</Text>
                        <Text style={styles.emptyText}>No recipes found</Text>
                        <Text style={styles.emptySubtext}>Try a different combination</Text>
                    </View>
                )}

                {!loading && results.length > 0 && (
                    <>
                        <Text style={styles.resultsCount}>{results.length} recipes found</Text>
                        <FlatList
                            data={results}
                            keyExtractor={(item) => item.idMeal}
                            renderItem={renderMealItem}
                            numColumns={2}
                            columnWrapperStyle={styles.row}
                            scrollEnabled={false}
                            contentContainerStyle={{ paddingBottom: 40 }}
                        />
                    </>
                )}
            </ScrollView>
        </View>
    );
}