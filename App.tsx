import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer, NavigationContainer} from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer  from './redux/mygames/reducer';
import Games from './components/mygames/Games';
import GameDetails from './components/mygames/GameDetails';
import PlaceForm from './components/mygames/PlaceForm';
import NewGameForm from './components/mygames/NewGameForm';

const client = axios.create({
  baseURL: 'https://975c0c59.ngrok.io',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const MainNavigator: NavigationContainer = createStackNavigator({
  Home: {screen: Games},
  GameDetails: {screen: GameDetails},
  AddGame: {screen: NewGameForm}, 
  UpdatePlace: {screen: PlaceForm}
},
{
  initialRouteName: "Home"
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <AppContainer />
      </Provider>
    )
  }
}