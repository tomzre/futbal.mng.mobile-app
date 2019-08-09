import React, { Component } from "react";
import { View, TextInput, Button } from "react-native";
import { ApiConst } from "./GameService/ApiConst";
import { connect } from 'react-redux';

import { updatePlace } from "./redux/mygames/reducer";

class PlaceForm extends Component {
    static navigationOptions = {
        title: 'Set new place for your game',
    };
    constructor(props) {
        super(props);
        this.state = { gameId: ''}
    }

    componentDidMount() {
        const gameId = this.props.navigation.getParam('id', 'no-id');
        this.setState({ gameId: gameId });
        const address = this.props.navigation.getParam('address', {});
        if (address != null) {
            this.setState({ street: address.street });
            this.setState({ number: address.number.toString() });
        }
    }

    setPlace(streetName: string, streetNumber: number) {

        const newPlace = JSON.stringify({
            street: streetName,
            number: streetNumber
        });

        this.props.updatePlace(newPlace, this.state.gameId);

        this.props.navigation.goBack()
    }

    render() {
        const { street, number } = this.state;

        return (
            <View style={{ padding: 10 }}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="street name"
                    onChangeText={(street) => this.setState({ street })}
                    value={street}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="street number"
                    keyboardType='numeric'
                    onChangeText={(number) => this.setState({ number })}
                    value={number}
                />
                <Button
                    onPress={() => this.setPlace(street, number)}
                    title="Save"
                    color="#841584"
                    accessibilityLabel="Save"
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
    };
  }
  
  const mapDispatchToProps = {
    updatePlace
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PlaceForm);