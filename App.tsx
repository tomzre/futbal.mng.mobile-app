import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Games from './Games';
import GameDetails from './GameDetails';
import { PlaceForm } from './PlaceForm';
import { NewGameForm } from './NewGameForm';

const MainNavigator = createStackNavigator({
  Home: {screen: Games},
  GameDetails: {screen: GameDetails},
  AddGame: {screen: NewGameForm},
  UpdatePlace: {screen: PlaceForm}
});

const App = createAppContainer(MainNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa69d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
