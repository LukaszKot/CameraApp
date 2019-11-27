import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{
                width: this.props.radius * 2, height: this.props.radius * 2, backgroundColor: "white",
                borderRadius: this.props.radius, margin: this.props.radius * 2 / 5,
                alignItems: "center",
                justifyContent: 'center',
            }}>
                <Entypo name={this.props.iconName} size={this.props.radius * 1.5} style={{
                    color: "#F44336"
                }} />
            </TouchableOpacity>
        );
    }
}


export default CircleButton;
