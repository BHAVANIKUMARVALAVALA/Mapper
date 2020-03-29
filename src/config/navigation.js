
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../home";
import {ProfileScreen}  from '../screens/profile'

const Stack = createStackNavigator();

function MyStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}options={{header: () => null}}/>
      <Stack.Screen name="Profile" component={ProfileScreen}options={{header: () => null}} />
    </Stack.Navigator>
  );
}


  export { MyStackNavigation }