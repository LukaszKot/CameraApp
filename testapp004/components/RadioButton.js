import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ height: 50, width: 200, flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity style={{
                    width: 40, height: 40, borderRadius: 20, borderColor: this.props.color, borderWidth: 2, borderStyle: "solid",
                    margin: 5, alignItems: "center", justifyContent: "center"
                }} onPress={this.press}>
                    <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: this.props.color, display: this.props.isEnabled ? "flex" : "none" }}>

                    </View>
                </TouchableOpacity>
                <View style={{ flex: 3, margin: 5 }}><Text style={{ color: "white", textAlign: "left" }}> {this.props.text} </Text></View>
            </View>
        );
    }

    press = () => {
        this.props.callback(this.props.index)
    }
}

export default RadioButton;
