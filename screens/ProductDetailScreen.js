import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Rating} from '@kolking/react-native-rating';
import data from '../data/catalog.json'; // { categories, products }
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRoute, useNavigation} from '@react-navigation/native';

export default function ProductDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // If pass just a productId, find that product from data
  // If pass the entire product in route.params, skip the find step
  const {productId} = route.params || {};
  const product = data.products.find(p => p.id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found.</Text>
      </View>
    );
  }

  // The product has images, so we can display the first or show a carousel
  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://i.imgur.com/placeholder.png';

  return (
    <View style={styles.container}>
      {/* Header Row with a back button */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            size={20}
            color="#fff"
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Image */}
        <Image source={{uri: mainImage}} style={styles.mainImage} />

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>₹{product.price}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>Rating: {product.rating}</Text>
            <Rating size={20} rating={product.rating} variant="stars" />
          </View>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.category}>Category: {product.category}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f1f1f1'},

  /* Header */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8a2be2',
    padding: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  scrollContent: {
    paddingBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#ddd',
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#1568ed',
    fontWeight: '600',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginRight: 5,
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});
