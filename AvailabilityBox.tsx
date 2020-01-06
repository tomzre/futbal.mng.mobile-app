import React from "react";
import { SafeAreaView, Switch } from "react-native"
import { setAvailability } from "./redux/mygames/reducer";
import { connect } from 'react-redux';

class AvailabilityBox extends React.Component {

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
        let body = JSON.stringify({
            userId: attendeeId,
            isAvailable: avail
        });
        
        this.props.setAvailability(body, gameId, attendeeId);
    }

    render() {
        
        const {check} = this.state;
        
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Switch
                    trackColor={ {false:'#dfe6e9', true: '#60a3bc'}}
                    thumbColor={'#3c6382'}
                    value={check}
                    onValueChange={(avail) => this.onChangeAvailability(avail, this.props.payload)}
                />
            </SafeAreaView>
        );
    }
}



const mapStateToProps = (state) => {
    
    return {
    
    };
  }
  
  const mapDispatchToProps = {
    setAvailability
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityBox);
