import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import data from '../data/catalog.json'; // Single JSON with { categories, products }
import FilterPanel from '../components/FilterPanel';

export default function CatalogScreen() {
  const {categories, products} = data;

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('Any');

  const isFiltersActive =
    category !== 'All' ||
    rating !== 'Any' ||
    minPrice !== '' ||
    maxPrice !== '';

  const openFilters = () => setFiltersVisible(true);
  const closeFilters = () => setFiltersVisible(false);

  const resetAllFilters = () => {
    setCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setRating('Any');
  };

  const handleApplyFilters = (newCat, newMin, newMax, newRating) => {
    setCategory(newCat);
    setMinPrice(newMin);
    setMaxPrice(newMax);
    setRating(newRating);
    setFiltersVisible(false);
  };

  // Toggle category: if tapping the same category, revert to 'All'
  const handleCategoryPress = catName => {
    setCategory(catName === category ? 'All' : catName);
  };

  // Filter logic
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
    return true;
  });

  // Render star icons
  const renderStars = productRating => {
    const fullStars = Math.floor(productRating);
    const halfStar = productRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.starContainer}>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <Icon key={`full-${i}`} name="star" size={15} color="gold" />
          ))}
        {halfStar && <Icon name="star-half-full" size={15} color="gold" />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <Icon key={`empty-${i}`} name="star-o" size={15} color="gold" />
          ))}
      </View>
    );
  };

  // Render each category in the horizontal slider
  const renderCategoryItem = ({item}) => (
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
  );

  return (
    <View style={styles.container}>
      {/* Header (purple) */}
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

      {/* Subheader with current filter info */}
      <View style={styles.currentFilters}>
        <Text style={styles.currentFiltersText}>
          Category: {category} | Price: {minPrice || '0'} - {maxPrice || '∞'} |
          Rating: {rating}
        </Text>
      </View>

      {/* Horizontal Category Slider (height = 100px) */}
      <View style={styles.categoryListContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={cat => cat.id.toString()}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.categoryListContent}
        />
      </View>

      {/* Products List */}
      <ScrollView style={styles.scrollArea}>
        {filteredProducts.length === 0 ? (
          <View style={styles.noProductTextContainer}>
            <Text style={styles.noProductText}>No products found</Text>
            <TouchableOpacity
              style={styles.resetButtonNP}
              onPress={resetAllFilters}>
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredProducts.map(item => {
            const firstImage =
              item.images && item.images.length > 0
                ? item.images[0]
                : 'https://i.imgur.com/placeholder.png';

            return (
              <View key={item.id} style={styles.productCard}>
                <Image source={{uri: firstImage}} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text>{item.description}</Text>
                  <Text style={styles.productPrice}>₹{item.price}</Text>
                  <Text style={styles.productCategory}>{item.category}</Text>
                  <Text style={styles.productRating}>
                    Rating: {item.rating}
                    {renderStars(item.rating)}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

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

  /* Header (purple bar) */
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

  /* Subheader row for current filter details */
  currentFilters: {
    backgroundColor: '#ddd',
    padding: 5,
  },
  currentFiltersText: {
    fontSize: 12,
    color: '#333',
  },

  /* Category Slider: only 100px tall */
  categoryListContainer: {
    height: 100, // fixed height for the entire category row
  },
  categoryListContent: {
    alignItems: 'center', // vertically center items
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

  /* Products list */
  scrollArea: {
    flex: 1,
    padding: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
  },
  productImage: {
    width: 120,
    height: 120,
  },
  productInfo: {
    flex: 1,
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
  productRating: {
    fontSize: 12,
    marginTop: 2,
  },
  starContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },

  /* No products found */
  noProductTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noProductText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#777',
  },
  resetButtonNP: {
    backgroundColor: 'lightgreen',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    marginTop: 10,
  },

  /* Modal Container */
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 16,
    borderRadius: 8,
  },
});
