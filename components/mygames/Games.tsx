import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { connect } from 'react-redux';
import { listGames } from '../../redux/mygames/reducer';

class Games extends Component {
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
    this.state = { refreshing: false }
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.listGames('5ebbf591-f261-4a7c-ab76-82e4d5cfebe0');
    //await this.apiCalls();
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
    this.props.navigation.navigate('AddGame');
  }

  _onRefresh = () => {
    console.log('refreshing');
    this.setState({ refreshing: true });
    this.props.listGames('5ebbf591-f261-4a7c-ab76-82e4d5cfebe0')
      .then(this.setState({ refreshing: false }));
  }

  render() {

    const { games, loading } = this.props;
    if (loading) {
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
            data={games}
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

const mapStateToProps = (state) => {
  let storedGames = state.games.map(game => ({ key: game.id, ...game }));
  const loading = state.loading;
  return {
    games: storedGames,
    loading
  };
};

const mapDispatchToProps = {
  listGames
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);