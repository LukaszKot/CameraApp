import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, Image } from 'react-native';

class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={{
                flex: 1,
                height: Dimensions.get("window").width / 4,
                padding: 2
            }}>
                <Image source={{ uri: this.props.photo.uri }} style={{
                    flex: 1
                }} />
            </TouchableOpacity>
        );
    }
}

export default FotoItem;
