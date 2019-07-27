import React from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, SafeAreaView  } from 'react-native';

export default class Games extends React.Component {
    static navigationOptions = {
        title: 'My Games',
      };

  constructor(props){
    super(props);
    this.state ={ gamesList: {}, isLoading: true}
  }

  async componentDidMount(){
    try{
        const gamesCallApi = await fetch('https://0826bbf7.ngrok.io/api/users/5ebbf591-f261-4a7c-ab76-82e4d5cfebe0/mygames');
        const games = await gamesCallApi.json();
        this.setState({gamesList: games, isLoading: false});
    } catch (err)
    {
        console.error("Error fetching games.", err);
    }
  }

  renderItem(data) {
    return <TouchableOpacity style={{backgroundColor: 'transparent'}}>
                <View  >
                    <Text>{data.item.name}</Text>
                    <Text>{data.item.gameDate}</Text>
                </View>
            </TouchableOpacity>
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
      </View>
      </SafeAreaView>
    );
  }
}