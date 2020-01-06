import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer, NavigationContainer} from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer  from './redux/mygames/reducer';
import Games from './Games';
import GameDetails from './GameDetails';
import { PlaceForm } from './PlaceForm';
import NewGameForm from './NewGameForm';

const client = axios.create({
  baseURL: 'http://192.168.0.94:5000/',
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