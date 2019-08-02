import React from "react";
import { Text, SafeAreaView, Switch } from "react-native"
import { CheckBox } from 'react-native-elements'
import { ApiConst } from "./GameService/ApiConst";

export default class AvailabilityBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {check: this.props.checked}

    }

    onChangeAvailability(avail: boolean, payload ) {
        let gameId = this.props.gameId;
        let attendeeId = payload.id;

        this.setState(prevState => ({
            check: !prevState.check
          }));
        
        fetch(`${ApiConst.apiUrl}api/games/${gameId}/attendees/${attendeeId}/available`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: attendeeId,
                isAvailable: avail
            }),
        });
    }


    render() {
        
        const {check} = this.state;
        
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                {/* <CheckBox 
          title='Click Here'
          checked={this.props.checked}/> */}
                <Switch
                    value={check}
                    onValueChange={(avail) => this.onChangeAvailability(avail, this.props.payload)}
                ></Switch>
            </SafeAreaView>
        );
    }
}