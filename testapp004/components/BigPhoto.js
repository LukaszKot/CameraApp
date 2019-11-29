import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Button from './Button';

class BigPhoto extends Component {
    static navigationOptions = {
        title: "Pojedyncze zdjęcie",
        headerStyle: {
            backgroundColor: "#F44336",
        },
        headerTitleStyle: {
            color: "#ffffff"
        },
        headerTintColor: "#ffffff"
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(this.props.navigation.state.params.photo)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 3 }}>
                    <Image
                        style={{ flex: 1 }}
                        resizeMode={'cover'}
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: this.props.navigation.state.params.photo.uri }}
                    />
                    <Text style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        fontSize: 30,
                        color: "white"
                    }}>{this.props.navigation.state.params.photo.width}x{this.props.navigation.state.params.photo.height}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Button onPress={this.delete} title={"USUŃ"} />
                </View>
            </View>
        );
    }

    delete = () => {
        this.props.navigation.state.params.refresh(this.props.navigation.state.params.photo)
        this.props.navigation.goBack()
    }
}

export default BigPhoto;
