import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={[styles.body, this.props.style]} onPress={this.props.onPress}>
                <Text style={[styles.text, this.props.text]}> {this.props.title} </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        width: 200,
        height: 50,
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        textAlign: "center"
    }
})

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};


export default Button;
