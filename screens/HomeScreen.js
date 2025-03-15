import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TopActionButtons from '../components/TopActionButtons';
import TablesTicketActionCon from '../components/TablesTicketActionCon';
import data from '../data/data.json';

const HomeScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <Header />

      {/* Outer ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Wrap main content in a responsive container */}
        <View style={styles.resContainer}>
          {/* Title */}
          <View style={styles.content}>
            <Text style={styles.title}>How Can We Help You?</Text>
          </View>

          {/* Top Action Buttons */}
          <TopActionButtons />

          {/* 3 Tables */}
          <TablesTicketActionCon data={data} />
        </View>
      </ScrollView>

      {/* Sidebar (Show if menuOpen) */}
      {menuOpen && (
        <View style={styles.sidebarContainer}>
          <Sidebar closeMenu={() => setMenuOpen(false)} />
        </View>
      )}

      {/* Menu Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuOpen(!menuOpen)}>
        <Icon name={menuOpen ? 'close' : 'menu'} size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0,
    paddingHorizontal: 5,
  },

  // The new style: limit max width and center it
  resContainer: {
    alignSelf: 'center', // center horizontally
    width: '100%', // default to full width
    maxWidth: 900, // or any max you prefer
  },

  content: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#F6F0F0',
    textAlign: 'center',
  },

  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#8A2BE2',
    elevation: 5,
    zIndex: 9999,
  },

  menuButton: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: '#1568ed',
    padding: 10,
    borderRadius: 5,
    zIndex: 9999,
  },
});

export default HomeScreen;
