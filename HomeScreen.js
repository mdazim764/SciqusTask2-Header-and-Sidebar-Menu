import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from './Sidebar';
import Header from './Header'; // Import Header

const HomeScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header (Always Visible) */}
      <Header />

      {/* Sidebar - Appears from Left when Open */}
      {menuOpen && (
        <View style={styles.sidebarContainer}>
          <Sidebar closeMenu={() => setMenuOpen(false)} />
        </View>
      )}

      {/* Main Content */}
      <View style={[styles.content, menuOpen && styles.contentShift]}>
        <Text style={styles.title}>Welcome to HomeScreen</Text>
      </View>

      {/* Menu Button (Bottom Left) */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuOpen(!menuOpen)}>
        <Icon name={menuOpen ? 'close' : 'menu'} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%', // Sidebar width
    height: '100%',
    backgroundColor: '#8A2BE2',
    elevation: 5,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentShift: {
    marginLeft: '60%', // Shift content when sidebar is open
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#1568ed',
    padding: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
