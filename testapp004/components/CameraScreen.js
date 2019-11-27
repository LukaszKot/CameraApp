import React, { Component } from 'react';
import { View, Text, StyleSheet, BackHandler, ToastAndroid } from 'react-native';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import CircleButton from './CircleButton';
import * as MediaLibrary from "expo-media-library";

class CameraScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            takenPhotos: []
        };
    }

    handleBackPress = () => {
        this.props.navigation.state.params.refresh(this.state.takenPhotos)
        this.props.navigation.goBack()
        return true;
    }

    async componentDidMount() {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status == 'granted' });
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    async componentWillUnmount() {
        this.backHandler.remove()
    }

    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <View><Text>brak dostępu do kamery</Text></View>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={{
                            flex: 1, flexDirection: "row", justifyContent: "center", height: 200, width: "100%",
                            position: "absolute", bottom: 0, alignItems: "center"
                        }}>
                            <CircleButton radius={33} iconName="cw" onPress={this.rotateCamera} />
                            <CircleButton radius={50} iconName="plus" onPress={this.doPhoto} />
                            <CircleButton radius={33} iconName="cog" onPress={this.goToSettings} />
                        </View>
                    </Camera>
                </View>
            );
        }
    }

    rotateCamera = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });

    }

    doPhoto = async () => {
        if (this.state.hasCameraPermission) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri);
            ToastAndroid.showWithGravity(
                'zrobiono zdjęcie!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            var takenPhotos = JSON.parse(JSON.stringify(this.state.takenPhotos));
            takenPhotos.push(asset)
            this.setState({
                takenPhotos: takenPhotos
            })
        }
    }

    goToSettings = () => {

    }
}

var styles = StyleSheet.create({

})

export default CameraScreen;
