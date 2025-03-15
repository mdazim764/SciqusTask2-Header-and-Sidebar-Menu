import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

import data from '../data/catalog.json'; // Single JSON { categories, products }
import FilterPanel from '../components/FilterPanel';
import {Rating} from '@kolking/react-native-rating';

export default function ProductListScreen() {
  const {categories, products} = data;
  const navigation = useNavigation();

  // Filter states
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('Any');
  const [searchTerm, setSearchTerm] = useState('');

  // Check if we have an active filter
  const isFiltersActive =
    category !== 'All' ||
    rating !== 'Any' ||
    minPrice !== '' ||
    maxPrice !== '' ||
    searchTerm !== '';

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

  // Category slider tap
  const handleCategoryPress = catName => {
    setCategory(catName === category ? 'All' : catName);
  };

  // Filter categories if they or their products match the searchTerm
  const filteredCategories = categories.filter(cat => {
    const catNameMatch = cat.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const hasProductMatch = products.some(
      p =>
        p.category === cat.name &&
        p.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return catNameMatch || hasProductMatch;
  });

  // Filter the products
  const filteredProducts = products.filter(prod => {
    if (category !== 'All' && prod.category !== category) {
      return false;
    }
    if (minPrice && prod.price < Number(minPrice)) {
      return false;
    }
    if (maxPrice && prod.price > Number(maxPrice)) {
      return false;
    }
    if (rating !== 'Any' && prod.rating < parseFloat(rating)) {
      return false;
    }

    const matchSearch =
      prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchSearch && searchTerm) {
      return false;
    }

    return true;
  });

  // Use dimension-based logic to decide how many columns
  const {width} = useWindowDimensions();
  const isTablet = width >= 768; // or another breakpoint if you prefer
  const numColumns = isTablet ? 4 : 2; // 4 columns on tablet, 2 on phone

  // We also limit card width so they don't stretch too wide
  const cardMaxWidth = 320;
  const cardWidth = Math.min((width - 40) / numColumns, cardMaxWidth);

  // Render each product
  const renderProductItem = ({item}) => {
    const firstImage =
      item.images && item.images.length > 0
        ? item.images[0]
        : 'https://i.imgur.com/placeholder.png';

    return (
      <TouchableOpacity
        style={[styles.productCard, {width: cardWidth}]}
        onPress={() => {
          navigation.navigate('ProductDetail', {productId: item.id});
        }}>
        <Image source={{uri: firstImage}} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.productPrice}>₹{item.price}</Text>
          <Text style={styles.productCategory}>{item.category}</Text>
          {/* Example rating usage
          <View style={styles.ratingRow}>
            <Text style={styles.productRating}>Rating: {item.rating}</Text>
            <Rating size={15} rating={item.rating} variant="stars" />
          </View>
          */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Product List</Text>

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

      {/* Subheader with filter info */}
      <View style={styles.currentFilters}>
        <Text style={styles.currentFiltersText}>
          Category: {category} | Price: {minPrice || '0'} - {maxPrice || '∞'} |
          Rating: {rating} | Search: {searchTerm || 'N/A'}
        </Text>
      </View>

      {/* Search input */}
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

      {/* 2- or 4-Column Product Grid */}
      {filteredProducts.length === 0 ? (
        <View style={styles.noProductTextContainer}>
          <Text style={styles.noProductText}>No products found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.productListContent}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={renderProductItem}
        />
      )}

      {/* Filters Modal */}
      <Portal>
        <Modal
          visible={filtersVisible}
          onDismiss={() => setFiltersVisible(false)}
          contentContainerStyle={styles.modalContainer}>
          <FilterPanel
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            rating={rating}
            onApply={handleApplyFilters}
            onCancel={() => setFiltersVisible(false)}
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

  /* Search bar */
  searchContainer: {
    backgroundColor: '#fff',
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },

  /* Category Slider */
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

  /* 2- or 4-column grid */
  productListContent: {
    padding: 10,
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    margin: 5,
  },
  productImage: {
    width: '100%',
    height: 170,
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  productPrice: {
    color: '#1568ed',
    fontWeight: '600',
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    color: '#999',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  productRating: {
    fontSize: 12,
    marginRight: 5,
  },

  /* No products found */
  noProductTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noProductText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
  },

  /* Modal Container */
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 16,
    borderRadius: 8,
  },
});
