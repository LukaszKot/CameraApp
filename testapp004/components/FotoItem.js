import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(this.props.photo)
        return (
            <TouchableOpacity style={{
            }}>
                <Image source={{ uri: this.props.photo.uri }} style={{
                    width: null,
                    height: null,
                    flex: 1
                }} />
            </TouchableOpacity>
        );
    }
}

export default FotoItem;
