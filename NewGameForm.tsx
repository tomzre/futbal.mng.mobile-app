import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "react-native-modal-datetime-picker";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import { ApiConst } from "./GameService/ApiConst";

export class NewGameForm extends Component
{
    static navigationOptions = {
        title: `Create a new game`,
        headerStyle: {
            backgroundColor: '#3c6382',
          },
      };

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
            ownerId: '5ebbf591-f261-4a7c-ab76-82e4d5cfebe0',
            address: {
                street: this.state.streetName,
                number: this.state.streetNumber == '' ? 0 : this.state.streetNumber
            }
        }
        console.log(JSON.stringify(payload));

        fetch(`${ApiConst.apiUrl}api/games`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        this.props.navigation.goBack();
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
        const valueGameDate = gameDate === '' ? '' : moment(gameDate).format('lll');
        return(
        <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginRight: 10}}>
                <TextInput
          style={styles.container}
          placeholder="Name"
          onChangeText={(name) => this.setState({name})}
          value={gameName}
        />
        <View style={{ flexDirection: 'row'}}>
        <TextInput 
            style={styles.dateContainer}
            placeholder="MM/DD/YYYY"
            onChangeText={(gameDate) => this.setState({gameDate})}
            value = {valueGameDate}
        />
        <FontAwesomeIcon
            onPress={this.showDateTimePicker}
            style={styles.dateIcon} icon={faCalendar} size={30}/>
        </View>
        <DateTimePicker
          mode='datetime'
          date= {intiTime}
          minuteInterval={30}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <View>
        <Text style={styles.container}>Address</Text>
        <TextInput style={styles.container}
            onChangeText={(streetName) => this.setState({streetName})}
            placeholder="Street Name"
            value={streetName}
        />
        <TextInput
            onChangeText={(streetNumber) => this.setState({streetNumber})}
            style={styles.container}
            keyboardType='numeric'
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
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      borderBottomColor: '#60a3bc',
      borderBottomWidth: 1
    },
    dateContainer : {
        width: 340,
        height: 50,
        borderBottomColor: '#60a3bc',
      borderBottomWidth: 1
    },
    dateIcon: {
        padding: 10,
        color: '#3c6382'
    },
    button: {
        paddingBottom: 5,
        marginBottom: 30,
        alignItems: 'center',
        backgroundColor: '#0c2461'
      },
  });