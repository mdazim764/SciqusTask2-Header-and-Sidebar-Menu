import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import data from '../data/catalog.json'; // { categories, products }
import FilterPanel from '../components/FilterPanel';

export default function CatalogScreen() {
  const navigation = useNavigation();

  const {categories, products} = data;

  // Filter states
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('Any');
  const [searchTerm, setSearchTerm] = useState('');

  // If any filter is active
  const isFiltersActive =
    category !== 'All' ||
    rating !== 'Any' ||
    minPrice !== '' ||
    maxPrice !== '' ||
    searchTerm !== '';

  // Toggle the filters modal
  const openFilters = () => setFiltersVisible(true);
  const closeFilters = () => setFiltersVisible(false);

  // Reset all filters
  const resetAllFilters = () => {
    setCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setRating('Any');
    setSearchTerm('');
  };

  // Apply filters from FilterPanel
  const handleApplyFilters = (newCat, newMin, newMax, newRating) => {
    setCategory(newCat);
    setMinPrice(newMin);
    setMaxPrice(newMax);
    setRating(newRating);
    setFiltersVisible(false);
  };

  // When tapping a category in the horizontal list
  const handleCategoryPress = catName => {
    // If tapping the same category again, revert to 'All'
    setCategory(catName === category ? 'All' : catName);
  };

  // If you want to filter categories by the searchTerm, do so here
  // We'll keep it simple and not filter categories in this snippet
  const filteredCategories = categories;

  // Subset of products for the chosen category
  const categoryProducts = products.filter(p => p.category === category);
  // Show up to 4 items
  const previewProducts = categoryProducts.slice(0, 4);

  // Only show if category != 'All' and there's at least 1 product
  const showCategoryPreview = category !== 'All' && categoryProducts.length > 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Product Catalogue</Text>

        {isFiltersActive && (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetAllFilters}>
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.filterButton} onPress={openFilters}>
          <Text style={styles.filterButtonText}>All Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Subheader (filter info) */}
      <View style={styles.currentFilters}>
        <Text style={styles.currentFiltersText}>
          Category: {category} | Price: {minPrice || '0'} - {maxPrice || '∞'} |
          Rating: {rating}
        </Text>
      </View>

      {/* Simple search input for product/category name (if needed) */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by product/category name"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Horizontal Category Slider */}
      <View style={styles.categoryListContainer}>
        <FlatList
          data={filteredCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={cat => cat.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.categoryItem,
                item.name === category && styles.categoryItemSelected,
              ]}
              onPress={() => handleCategoryPress(item.name)}>
              <Image source={{uri: item.image}} style={styles.categoryImage} />
              <Text
                style={[
                  styles.categoryText,
                  item.name === category && styles.categoryTextSelected,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoryListContent}
        />
      </View>

      {/* Category preview: up to 4 products */}
      {showCategoryPreview && (
        <View style={styles.categoryPreviewContainer}>
          <Text style={styles.previewHeader}>{category} - Quick View</Text>

          <FlatList
            data={previewProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              const firstImage =
                item.images && item.images.length > 0
                  ? item.images[0]
                  : 'https://i.imgur.com/placeholder.png';

              return (
                <TouchableOpacity
                  style={styles.previewItem}
                  onPress={() => {
                    // Navigate to ProductDetail screen, passing productId
                    navigation.navigate('ProductDetail', {productId: item.id});
                  }}>
                  <Image
                    source={{uri: firstImage}}
                    style={styles.previewImage}
                  />
                  <Text style={styles.previewTitle}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />

          {/* "View More" button if at least 1 product */}
          {categoryProducts.length >= 1 && (
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => {
                // Navigate to ProductList with the selected category
                // Also pass minPrice, maxPrice, rating, searchTerm if needed
                navigation.navigate('ProductList', {
                  category,
                  minPrice,
                  maxPrice,
                  rating,
                  searchTerm,
                });
              }}>
              <Text style={styles.viewAllText}>View More</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* If category == 'All', let user see "All" in ProductList */}
      {category === 'All' && (
        <TouchableOpacity
          style={[styles.viewAllButton, {margin: 10}]}
          onPress={() => {
            navigation.navigate('ProductList', {
              category: 'All',
              minPrice,
              maxPrice,
              rating,
              searchTerm,
            });
          }}>
          <Text style={styles.viewAllText}>View All Products</Text>
        </TouchableOpacity>
      )}

      {/* Filters Modal */}
      <Portal>
        <Modal
          visible={filtersVisible}
          onDismiss={closeFilters}
          contentContainerStyle={styles.modalContainer}>
          <FilterPanel
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            rating={rating}
            onApply={handleApplyFilters}
            onCancel={closeFilters}
          />
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f1f1f1'},

  /* Header */
  headerRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#8a2be2',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
  },
  resetButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 8,
  },
  resetButtonText: {
    color: '#8a2be2',
    fontWeight: '600',
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  filterButtonText: {
    color: '#8a2be2',
    fontWeight: '600',
  },

  /* Subheader row */
  currentFilters: {
    backgroundColor: '#ddd',
    padding: 5,
  },
  currentFiltersText: {
    fontSize: 12,
    color: '#333',
  },

  /* Simple search bar */
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },

  /* Category slider */
  categoryListContainer: {
    height: 100,
  },
  categoryListContent: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#8a2be2',
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
  },
  categoryTextSelected: {
    fontWeight: 'bold',
    color: '#8a2be2',
  },

  /* Category preview container */
  categoryPreviewContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  previewHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  previewItem: {
    width: 90,
    alignItems: 'center',
    marginRight: 10,
  },
  previewImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
    borderRadius: 30,
    backgroundColor: '#ddd',
  },
  previewTitle: {
    fontSize: 11,
    textAlign: 'center',
  },
  viewAllButton: {
    marginTop: 5,
    padding: 8,
    backgroundColor: '#d1d1d1',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  viewAllText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },

  /* Modal Container */
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 16,
    borderRadius: 8,
  },
});
