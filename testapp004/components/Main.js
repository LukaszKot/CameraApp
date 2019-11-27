import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';

class Main extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.largeTextHeader}>Camera App</Text>
                    <Text style={styles.smallTextHeader}>show gallery pictures</Text>
                    <Text style={styles.smallTextHeader}>take pictures from camera</Text>
                    <Text style={styles.smallTextHeader}>save photo to device</Text>
                    <Text style={styles.smallTextHeader}>delete photo from device</Text>
                </View>
                <View style={styles.footer}>
                    <Button title="START" onPress={this.onPress} />
                </View>
            </View>
        );
    }

    onPress = () => {
        this.props.navigation.navigate("gallery");
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F44336"
    },
    footer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    largeTextHeader: {
        fontSize: 50,
        color: "#ffffff"
    },
    smallTextHeader: {
        fontSize: 20,
        color: "#ffffff"
    }
})

export default Main;
