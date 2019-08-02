import React from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, SafeAreaView  } from 'react-native';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { ApiConst } from './GameService/ApiConst';

export default class Games extends React.Component {
    static navigationOptions = {
        title: 'My Games',
        headerStyle: {
          backgroundColor: 'powderblue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 26
        },
      };

  constructor(props){
    super(props);
    this.state ={ gamesList: {}, isLoading: true}
    this.renderItem = this.renderItem.bind(this);
  }

  async componentDidMount(){
    try{
        const gamesCallApi = await fetch(`${ApiConst.apiUrl}api/users/5ebbf591-f261-4a7c-ab76-82e4d5cfebe0/mygames`);
        const games = await gamesCallApi.json();
        this.setState({gamesList: games, isLoading: false});
    } catch (err)
    {
        console.error("Error fetching games.", err);
    }
  }

gameDetails(id)
{
    this.props.navigation.navigate('GameDetails', {id: id});
}

  renderItem(data) {
    return <TouchableOpacity 
                onPress={() => this.gameDetails(data.item.id)}
                style={{backgroundColor: 'transparent'}}>
                <View  >
                    <Text>{data.item.name}</Text>
                    <Text>Game time: {data.item.gameDate}</Text>
                    <Text>Attendees: {data.item.availableAttendees}/{data.item.totalAttendees}/{data.item.requiredAttendees}</Text>
                </View>
            </TouchableOpacity>
}

addGame(){
  this.props.navigation.navigate('AddGame');
}

  render(){
    const { gamesList, isLoading } = this.state;
    if(isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 10, paddingTop:10}}>
        <FlatList
          data={gamesList}
          renderItem={this.renderItem}
          keyExtractor={({id}, index) => id}
        />
        <TouchableOpacity
        onPress={() => this.addGame()}
        style={{backgroundColor: 'transparent'}}
        >
        <FontAwesomeIcon 
          style={{flex: 1, color: 'powderblue', margin: 20, position: 'absolute', right: 0, bottom: 0}}
          icon={ faPlusCircle } size={64} />
       </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  }
}