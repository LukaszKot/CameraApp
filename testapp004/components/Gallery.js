import React, { Component } from 'react';
import { View, Text, StyleSheet, ToolbarAndroid } from 'react-native';
import Button from './Button';
import { FlatList } from 'react-native-gesture-handler';
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import FotoItem from "./FotoItem";


class Gallery extends Component {
    static navigationOptions = {
        header: null
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
                <View style={{ backgroundColor: "#F44336", height: 24 }} />
                <ToolbarAndroid
                    style={{
                        backgroundColor: '#F44336',
                        height: 56, width: "100%",
                        elevation: 0,

                    }}

                    titleColor="#ffffff"
                    title="Galeria"
                    navIcon={require("../assets/back.png")}
                    onIconClicked={() => this.props.navigation.goBack()}
                    actions={[
                        { title: 'grid / list', show: 'never' },
                        { title: 'open camera', show: 'never' },
                        { title: 'remove selected', show: 'never' },
                    ]}
                    onActionSelected={this.onActionSelected}
                />
                <View style={styles.galleryView}>
                    <FlatList style={{ flexDirection: 'column' }}
                        data={this.state.photos}
                        renderItem={({ item, index }) => <FotoItem isGrid={this.state.isGrid} photo={item} selectCallback={this.select} index={index} displaySingleCallback={this.displaySingleCallback} />}
                        keyExtractor={(item, index) => item + index}
                        numColumns={this.state.numColumns}
                        key={this.state.numColumns}
                    />
                </View>
            </View>
        );
    }

    onActionSelected = (position) => {
        switch (position) {
            case 0:
                this.changeGridToListOrReverse()
                break;
            case 1:
                this.openCamera()
                break;
            case 2:
                this.removeSelected()
                break;
        }
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

    removeSelected = async () => {
        var photosList = JSON.parse(JSON.stringify(this.state.photos));
        await MediaLibrary.deleteAssetsAsync(photosList.filter(x => x.toDelete == true).map(x => x.id));
        var photosList = photosList.filter(x => x.toDelete != true)
        this.setState({
            photos: photosList
        })
    }

    select = (i) => {
        var photosList = JSON.parse(JSON.stringify(this.state.photos))
        photosList[i].toDelete = photosList[i].toDelete ? false : true
        this.setState({
            photos: photosList
        })
    }

    displaySingleCallback = (i) => {
        this.props.navigation.navigate("bigPhoto", { photo: this.state.photos[i], refresh: this.refreshDelete })
    }

    refreshDelete = async (photo) => {
        var photosList = JSON.parse(JSON.stringify(this.state.photos));
        await MediaLibrary.deleteAssetsAsync([photo.id]);
        var photosList = photosList.filter(x => x.id != photo.id)
        this.setState({
            photos: photosList
        })
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
