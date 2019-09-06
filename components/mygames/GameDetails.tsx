import React from 'react';
import { ActivityIndicator, Text, View, SafeAreaView  } from 'react-native';
import { AttendeesList } from './AttendeesList';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';

import { receiveGame } from '../../redux/mygames/reducer'

class GameDetails extends React.Component {
    static navigationOptions = {
      headerStyle: {
        backgroundColor: '#3c6382',
      }
      };

      constructor(props){
        super(props);
    }

 componentDidMount(){
  const { id } = this.props.navigation.state.params;

  this.props.receiveGame(id);
}

goToPlaceForm(gameId: string, address){
  this.props.navigation.navigate('UpdatePlace', 
  {
    id: gameId,
    address: address
  });
}

render(){
    
    const { game, loading} = this.props;

    
    if(loading){
      return(
        <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }
      
      var street = game.address != null || undefined ? game.address.street : '';
      var number = game.address != null || undefined ? game.address.number : '';
    return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} >
      <Text style={ { 
            color: 'steelblue', 
            fontWeight: 'bold', 
            fontSize: 36, 
            textAlign: 'center'}} 
      >
        {game.name}
      </Text>
      
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

const mapStateToProps = (state) => {
  const game = state.game;
  const loading = state.loading;
  return {
    game,
    loading
  };
}

const mapDispatchToProps = {
  receiveGame
};

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails);