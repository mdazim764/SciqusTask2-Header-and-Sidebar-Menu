{
  /* TOP ACTION BUTTONS */
}
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TopActionButtons = () => {
  // Access navigation
  const navigation = useNavigation();
  return (
    <View style={styles.actionRow}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('RaiseTicket')} // Navigate
      >
        <Icon name="work" size={40} color="#6b5b95" />
        <Text style={styles.cardText}>Raise a Ticket</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Catalog')} // Navigate
      >
        <Icon name="category" size={40} color="#6b5b95" />
        <Text style={styles.cardText}>Catalogue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Icon name="redeem" size={40} color="#6b5b95" />
        <Text style={styles.cardText}>Offers for me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  /* Top Action Buttons */
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: 'Poppins-Bold',
  },
});

export default TopActionButtons;
