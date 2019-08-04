import React from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, SafeAreaView  } from 'react-native';
import AvailabilityBox from './AvailabilityBox';
import { AttendeesList } from './AttendeesList';
import { PlaceForm } from './PlaceForm';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faLocationArrow, faGlobe, faGlobeAfrica, faGlobeEurope, faGlobeAmericas, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { ApiConst } from './GameService/ApiConst';

export default class GameDetails extends React.Component {
    static navigationOptions = {
      headerStyle: {
        backgroundColor: '#3c6382',
      }
      };

  constructor(props){
    super(props);
    this.state = {game: {}, isLoading: false}
}

async componentDidMount(){
    this.setState({...this.state, game: {}, isLoading: true});
    const gameId = this.props.navigation.getParam('id', 'no-id');

    if(gameId === 'no-id'|| gameId == null)
    {
        throw new console.error("Game Id is null", gameId);
    }

    try{
        const gameApiCall = await fetch(`${ApiConst.apiUrl}api/games/${gameId}`);
        const game = await gameApiCall.json();
        this.setState({game: game, isLoading: false});
    } catch (err)
    {
        console.error("Error fetching games.", err);
    }
}

goToPlaceForm(gameId: string, address){
  this.props.navigation.navigate('UpdatePlace', 
  {
    id: gameId,
    address: address
  });
}

render(){
    
    const { game, isLoading} = this.state;

    var street = game.address != null ? game.address.street : '';
    var number = game.address != null ? game.address.number : '';
    
    if(isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }

    return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} >
      <Text style={{color: 'steelblue', fontWeight: 'bold', fontSize: 36, textAlign: 'center'}} >{game.name}</Text>
      
      <Text>Place: {street} - {number}</Text>
      <FontAwesomeIcon 
       onPress={() => this.goToPlaceForm(game.id, game.address)}
       style={{color: 'powderblue', margin: 20, position: 'absolute', right: 0}}
       icon={ faMapMarkedAlt } size={28} />
      <AttendeesList attendees={game.attendees} gameId={game.id}></AttendeesList>
      </SafeAreaView>
    );
  }
}