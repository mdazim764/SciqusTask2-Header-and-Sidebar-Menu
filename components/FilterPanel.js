// FilterPanel.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Chip, Button} from 'react-native-paper';

const categories = [
  'All',
  'Electronics',
  'Clothes',
  'Kitchen',
  'Fitness',
  'Footwear',
  'Accessories',
];
const ratings = ['Any', '3', '4', '4.5'];

export default function FilterPanel({
  category,
  minPrice,
  maxPrice,
  rating,
  onApply,
  onCancel,
}) {
  const [tempCategory, setTempCategory] = useState(category);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempRating, setTempRating] = useState(rating);

  const handleApply = () => {
    onApply(tempCategory, tempMinPrice, tempMaxPrice, tempRating);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>

      {/* Category */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {categories.map(cat => (
          <Chip
            key={cat}
            mode="outlined"
            style={styles.chip}
            textStyle={styles.chipText}
            selected={tempCategory === cat}
            onPress={() => setTempCategory(cat)}>
            {cat}
          </Chip>
        ))}
      </View>

      {/* Price Range */}
      <Text style={styles.label}>Price Range</Text>
      <View style={styles.priceRow}>
        <TextInput
          style={styles.priceInput}
          keyboardType="numeric"
          placeholder="Min"
          value={tempMinPrice.toString()}
          onChangeText={val => setTempMinPrice(val)}
        />
        <Text style={{marginHorizontal: 5}}>to</Text>
        <TextInput
          style={styles.priceInput}
          keyboardType="numeric"
          placeholder="Max"
          value={tempMaxPrice.toString()}
          onChangeText={val => setTempMaxPrice(val)}
        />
      </View>

      {/* Rating */}
      <Text style={styles.label}>Minimum Rating</Text>
      <View style={styles.row}>
        {ratings.map(rate => (
          <Chip
            key={rate}
            mode="outlined"
            style={styles.chip}
            textStyle={styles.chipText}
            selected={tempRating === rate}
            onPress={() => setTempRating(rate)}>
            {rate === 'Any' ? 'Any' : `${rate}+`}
          </Chip>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Button mode="outlined" onPress={onCancel} style={{marginRight: 10}}>
          Cancel
        </Button>
        <Button mode="contained" onPress={handleApply}>
          Apply
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 13, // override labelLarge
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceInput: {
    width: 70,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 4,
    borderRadius: 4,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'flex-end',
  },
});
