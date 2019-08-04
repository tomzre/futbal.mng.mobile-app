import React from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, SafeAreaView, RefreshControl} from 'react-native';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { ApiConst } from './GameService/ApiConst';

export default class Games extends React.Component {
  static navigationOptions = {
    title: 'My Games',
    headerStyle: {
      backgroundColor: '#3c6382',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 26
    },
  };

  constructor(props) {
    super(props);
    this.state = { gamesList: {}, isLoading: true, refreshing: false}
    this.renderItem = this.renderItem.bind(this);
  }

  async componentDidMount() {
    await this.apiCalls();
  }

  async apiCalls() {
    try {
      const gamesCallApi = await fetch(`${ApiConst.apiUrl}api/users/5ebbf591-f261-4a7c-ab76-82e4d5cfebe0/mygames`);
      const games = await gamesCallApi.json();
      this.setState({ gamesList: games, isLoading: false });
    } catch (err) {
      console.error("Error fetching games.", err);
    }
  }

  gameDetails(id) {
    this.props.navigation.navigate('GameDetails', { id: id });
  }

  renderItem(data) {
    return <TouchableOpacity
      onPress={() => this.gameDetails(data.item.id)}
      style={{ backgroundColor: 'transparent' }}>
      <View  >
        <Text>{data.item.name}</Text>
        <Text>Game time: {data.item.gameDate}</Text>
        <Text>Attendees: {data.item.availableAttendees}/{data.item.totalAttendees}/{data.item.requiredAttendees}</Text>
      </View>
    </TouchableOpacity>
  }

  addGame() {
    console.log('pressed');
    this.props.navigation.navigate('AddGame');
  }

  _onRefresh = async () => {
    console.log('refreshing');
    this.setState({refreshing: true});
    await this.apiCalls();
    this.setState({refreshing: false}); 
  }

  render() {
    const { gamesList, isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 10, paddingTop: 10 }}>
          <FlatList
            refreshControl={
              <RefreshControl
        colors={["#9Bd35A", "#689F38"]}
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
    />
            }
            data={gamesList}
            renderItem={this.renderItem}
            keyExtractor={({ id }, index) => id}
          />
          <FontAwesomeIcon
            onPress={() => this.addGame()}
            style={{ flex: 1, zIndex: 1, color: '#3c6382', margin: 20, position: 'absolute', right: 0, bottom: 0 }}
            icon={faFutbol} size={64} />
        </View>
      </SafeAreaView>
    );
  }
}