/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import {MyStackNavigation} from './src/config/navigation';
import {View, Text} from 'react-native';


export default class App extends Component {

 render(){
   return (
     <NavigationContainer>
       <MyStackNavigation/>
     </NavigationContainer>
   )
 }

};

