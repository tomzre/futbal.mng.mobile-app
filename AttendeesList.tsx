import React, { Component } from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import AvailabilityBox from "./AvailabilityBox";

export class AttendeesList extends Component
{
    constructor(props) {
        super(props);
        this.state = {attendeesList: {}}
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(data) {
        return <TouchableOpacity 
                    style={{backgroundColor: 'transparent'}}>
                    <View  >
                        <Text>First Name: {data.item.firstName}</Text>
                        <Text>Last Name: {data.item.lastName}</Text>
                        <AvailabilityBox 
                            checked={data.item.isAvailable} 
                            gameId={this.props.gameId} 
                            payload={data.item}></AvailabilityBox>
                    </View>
                </TouchableOpacity>
    }

    render()
    {
        return (
            <View>
                 <FlatList
          data={this.props.attendees}
          renderItem={this.renderItem}
          keyExtractor={({id}, index) => id}
        />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    checkbox: {
      color: 'orange'
    }
  });