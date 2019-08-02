import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { PlaceForm } from "./PlaceForm";
import DateTimePicker from "react-native-modal-datetime-picker";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

export class NewGameForm extends Component
{
    constructor(props) {
        super(props); 
        this.state = {
            name: '',
            gameDate: '',
            streetName: '',
            streetNumber: '',
            isDateTimePickerVisible: false
        }   
    }
    createGame() {
        let testDate = moment(this.state.gameDate).format("lll");
        console.log(testDate);
        let payload = {
            name: this.state.name,
            gameDate: this.state.gameDate,
            address: {
                street: this.state.street,
                number: this.state.number
            }
        }
        console.log(JSON.stringify(payload));

    }
    showDateTimePicker = () => {
        console.log("pressed");
        this.setState({ isDateTimePickerVisible: true });
      };
     
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };
     
      handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.state.gameDate = date;
        this.hideDateTimePicker();
      };
    render(){
        const {gameName, gameDate, streetName, streetNumber} = this.state
        const initDate = new Date();
        const intiTime = new Date(initDate.setHours(initDate.getHours()));
        return(
            <View>
                <TextInput

          style={styles.container}
          placeholder="Name"
          onChangeText={(name) => this.setState({name})}
          value={gameName}
        />
        <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20}}>
        <TextInput 
            style={styles.dateContainer}
            placeholder="MM/DD/YYYY"
            onChangeText={(gameDate) => this.setState({gameDate})}
            value = {moment(gameDate).format("YYYY-MM-DD HH:mm")}
        />
        <TouchableOpacity
            onPress={this.showDateTimePicker}
        >
            <FontAwesomeIcon style={styles.dateIcon} icon={faCalendar} size={24}/>
        </TouchableOpacity>
        </View>
        <DateTimePicker
          mode='datetime'
          date= {intiTime}
          minuteInterval={30}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <Text style={styles.container}>Address</Text>
        <TextInput style={styles.container}
            onChangeText={(streetName) => this.setState({streetName})}
            placeholder="Street Name"
            value={streetName}
        />
        <TextInput
            onChangeText={(streetNumber) => this.setState({streetNumber})}
            style={styles.container}
            placeholder="Street Number"
            value={streetNumber}
        />
        <Button
            style={styles.button}
            onPress={() => this.createGame()}
            title="Create New Game"
            accessibilityLabel="Create New Game"
            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      padding: 20
    },
    dateContainer : {
        padding: 10
    },
    dateIcon: {
        alignContent: 'flex-end'
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
      },
  });