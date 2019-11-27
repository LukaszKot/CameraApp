import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { FlatList } from 'react-native-gesture-handler';
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import FotoItem from "./FotoItem";


class Gallery extends Component {
    static navigationOptions = {
        title: "Galeria",
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
            photos: [],
            numColumns: 1
        };
    }
    async componentWillMount() {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo'
        })
        this.setState({
            photos: obj.assets
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topMenu}>
                    <Button title="GRID / LIST" onPress={this.changeGridToListOrReverse} style={styles.buttonStyle} text={styles.buttonTextStyle} />
                    <Button title="OPEN CAMERA" onPress={this.openCamera} style={styles.buttonStyle} text={styles.buttonTextStyle} />
                    <Button title="REMOVE SELECTED" onPress={this.removeSelected} style={styles.buttonStyle} text={styles.buttonTextStyle} />
                </View>
                <View style={styles.galleryView}>
                    <FlatList style={{ flexDirection: 'column' }}
                        data={this.state.photos}
                        renderItem={({ item }) => <FotoItem isGrid={this.state.isGrid} photo={item} />}
                        keyExtractor={(item, index) => item + index}
                        numColumns={this.state.numColumns}
                        key={this.state.numColumns}
                    />
                </View>
            </View>
        );
    }

    refreshPhotosInGallery = (photos) => {
        var photosList = JSON.parse(JSON.stringify(this.state.photos))
        photos.forEach(element => {
            photosList.unshift(element)
        });
        this.setState({
            photos: photosList
        })
    }

    changeGridToListOrReverse = () => {
        this.setState({
            numColumns: this.state.numColumns == 4 ? 1 : 4
        })
    }

    openCamera = () => {
        this.props.navigation.navigate("cameraScreen", { refresh: this.refreshPhotosInGallery })
    }

    removeSelected = () => {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topMenu: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        flex: 1,
    },
    galleryView: {
        flex: 7
    },
    buttonTextStyle: {
        fontSize: 12
    }
})

export default Gallery;
