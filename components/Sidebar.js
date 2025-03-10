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

const Sidebar = ({visible, closeMenu}) => {
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
                  onPress={closeMenu}>
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

const menuItems = [
  {name: 'Home', icon: 'home'},
  {name: 'My Account', icon: 'person'},
  {name: 'Events', icon: 'event'},
  {name: 'Contacts', icon: 'contacts'},
  {name: 'Proposals', icon: 'work'},
  {name: 'My Tickets', icon: 'confirmation-number'},
];

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    flexDirection: 'row', // Ensures sidebar aligns to the left
  },
  sidebar: {
    width: 250,
    height: '100%',
    backgroundColor: '#1568ed',
    padding: 20,
    justifyContent: 'center',
    position: 'absolute',
    left: 0, // Sidebar from the left
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
