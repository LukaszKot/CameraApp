import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RadioButton from './RadioButton';

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.defaultIndex ? this.props.defaultIndex : 0
        };
    }

    render() {
        return (
            <View style={{ borderTopColor: "white", borderStyle: "solid", borderTopWidth: 1, marginHorizontal: 10, marginVertical: 30 }}>
                <Text style={{ textAlign: "right", color: "white", textTransform: "uppercase", fontWeight: "bold" }}> {this.props.groupName} </Text>
                <View style={{ flexDirection: this.props.direction, flexWrap: "wrap" }}>
                    {this.renderRadioButtons()}
                </View>
            </View>
        );
    }

    renderRadioButtons = () => {
        return this.props.data.map((x, i) => (
            <RadioButton color={this.props.color} text={x} index={i} callback={this.handleClick} isEnabled={i == this.props.selectedIndex} key={i} />
        ))
    }

    handleClick = (i) => {
        this.props.change(i)
    }
}

export default RadioGroup;
