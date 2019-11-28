import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

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
            }} onPress={this.shortPress} onLongPress={this.longPress}>
                <Image source={{ uri: this.props.photo.uri }} style={{
                    flex: 1
                }} />
                <View style={this.props.photo.toDelete ? styles.hover : styles.none}>
                    <Entypo name={"plus"} size={50} style={{
                        color: "#F44336"
                    }} />
                </View>
                <Text style={{
                    position: "absolute", right: 0, bottom: 0, color: this.props.photo.toDelete ? "black" : "white", marginRight: 5, marginBottom: 5,
                    fontSize: 15
                }}>
                    {this.props.photo.id}
                </Text>
            </TouchableOpacity>
        );
    }

    shortPress = () => {
        this.props.selectCallback(this.props.index);
    }

    longPress = () => {
        this.props.displaySingleCallback(this.props.index);
    }
}

var styles = StyleSheet.create({
    hover: {
        position: "absolute",
        left: 0,
        top: 0,
        margin: 2,
        height: Dimensions.get("window").width / 4,
        width: "100%",
        backgroundColor: "#ffffff",
        opacity: 0.8,
        alignItems: "center",
        justifyContent: "center"
    },
    none: {
        display: "none"
    },
})

export default FotoItem;
