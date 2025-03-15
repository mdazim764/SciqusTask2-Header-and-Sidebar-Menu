import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Sidebar = ({visible, closeMenu}) => {
  // Access the navigation object
  const navigation = useNavigation();

  // Define your menu items with a `route` property
  const menuItems = [
    {name: 'Home', icon: 'home', route: 'Home'},
    {name: 'My Account', icon: 'person', route: 'Account'},
    {name: 'Events', icon: 'event', route: 'Events'},
    {name: 'Contacts', icon: 'contacts', route: 'Contacts'},
    {name: 'Proposals', icon: 'work', route: 'Proposals'},
    {name: 'My Tickets', icon: 'confirmation-number', route: 'Tickets'},

    // NEW: Add a "YouTube Video" item
    {name: 'YouTube Video', icon: 'ondemand-video', route: 'Video'},
  ];

  // Handler when a menu item is pressed
  const handleMenuItemPress = item => {
    closeMenu(); // close the sidebar
    if (item.route) {
      navigation.navigate(item.route); // navigate to the item's route
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={closeMenu} // Close on back button (Android)
    >
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={styles.sidebar}>
              {/* Close Button */}
              <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
                <Icon name="close" size={24} color="white" />
              </TouchableOpacity>

              {/* Menu Items */}
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleMenuItemPress(item)}>
                  <Icon name={item.icon} size={24} color="white" />
                  <Text style={styles.menuText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    height: '100%',
    backgroundColor: '#1568ed',
    padding: 20,
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Sidebar;
