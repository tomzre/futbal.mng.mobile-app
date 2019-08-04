import React, { Component } from "react";
import { View, TextInput, Button } from "react-native";
import { ApiConst } from "./GameService/ApiConst";

export class PlaceForm extends Component {
    static navigationOptions = {
        title: 'Set new place for your game',
    };
    constructor(props) {
        super(props);
        this.state = { gameId: '', street: this.props.street, number: this.props.number }
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

    async updatePlace() {

        await fetch(`${ApiConst.apiUrl}api/games/${this.state.gameId}/places`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                street: this.state.street,
                number: this.state.number
            }),
        })
        console.log(this.state.street);
        console.log(this.state.number);
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
                    onPress={() => this.updatePlace()}
                    title="Save"
                    color="#841584"
                    accessibilityLabel="Save"
                />
            </View>
        );
    }
}