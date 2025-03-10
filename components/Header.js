import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Menu items with icons and labels
const menuItems = [
  {name: 'My Space', icon: 'account-circle'},
  {name: 'Settings', icon: 'settings'},
  {name: 'Help', icon: 'help-outline'},
  {name: 'Logout', icon: 'logout'},
];

const Header = () => {
  const [visible, setVisible] = useState(false);

  return (
    <ImageBackground
      source={{
        uri: 'https://t4.ftcdn.net/jpg/02/76/08/07/360_F_276080724_hltnCyDjcqAyRtLzDYo3T2jXbBtCD7fl.jpg',
      }} // Background Image
      style={styles.header}>
      {/* Left Side: Logo */}
      <Text style={styles.logo}>Logo</Text>

      {/* Right Side: Profile Dropdown */}
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchorPosition="bottom" // ✅ Opens the menu below the profile
        anchor={
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={styles.profile}>
            <Image
              source={{uri: 'https://i.pravatar.cc/40'}}
              style={styles.avatar}
            />
            <Text style={styles.username}>Anandrao</Text>
            <Icon name="arrow-drop-down" size={24} color="white" />
          </TouchableOpacity>
        }>
        {/* Grid Layout for Dropdown Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {}}>
              <Icon name={item.icon} size={24} color="black" />
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Menu>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 20, // Space for notch
    height: 70, // Fixed height for background image
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 5,
  },
  username: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    width: 200, // Set a fixed width
  },
  menuItem: {
    width: '45%', // Two columns
    alignItems: 'center',
    padding: 10,
  },
  menuText: {
    marginTop: 5,
    fontSize: 14,
    color: 'black',
  },
});

export default Header;
