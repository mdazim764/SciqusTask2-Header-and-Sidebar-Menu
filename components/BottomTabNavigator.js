import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './HomeScreen';
import Sidebar from './components/Sidebar';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabs = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#8A2BE2'},
        tabBarActiveTintColor: 'white',
      }}>
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Menu Button in Bottom Tab */}
      <Tab.Screen
        name="Menu"
        component={HomeScreen} // Placeholder, won't be used
        options={{
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.openDrawer()} // Open Drawer on Click
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: '#6A1B9A', // Slightly darker purple
              }}>
              <Icon name="menu" size={30} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main Navigation with Drawer
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <Sidebar {...props} />}>
        <Drawer.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
