/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import ContactScreen from './src/screens/ContactScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import Setting from './src/screens/Setting';
import Icon from 'react-native-vector-icons/MaterialIcons';

function App() {
  const Tab = createMaterialBottomTabNavigator();
  return(
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name='Home' component={HomeScreen} options = {{
          tabBarIcon:()=><Icon name = "home" color = "#970FFB" size = {23} />
        }} />
        {/* <Tab.Screen name='Map' component={MapScreen} /> */}
        <Tab.Screen name='Contact' component={ContactScreen} options = {{
          tabBarIcon:()=><Icon name = "phone" color = "#970FFB" size = {23} />
        }} />
        {/* <Tab.Screen name='Setting' component={Setting} options = {{
          tabBarIcon:()=><Icon name = "settings" color = "#970FFB" size = {23} />
        }} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  
});

export default App;
