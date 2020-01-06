import React, { Component } from "react";
import { View, TextInput, Button } from "react-native";
import { connect } from 'react-redux';
import { changeGamePlace } from "./redux/mygames/reducer";

class PlaceForm extends Component {
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
        const payload = {
            street: this.state.street,
            number: parseInt(this.state.number)
        };

        this.props.changeGamePlace(this.state.gameId, payload)

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

const mapStateToProps = (state) => {
    return {

};
}

const mapDispatchToProps = {
    changeGamePlace
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceForm);