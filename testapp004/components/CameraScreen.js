import React, { Component } from 'react';
import { View, Text, StyleSheet, BackHandler, ToastAndroid, Animated, Dimensions, ScrollView } from 'react-native';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import CircleButton from './CircleButton';
import * as MediaLibrary from "expo-media-library";
import RadioGroup from './RadioGroup';

class CameraScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            takenPhotos: [],
            wb: "auto",
            fm: "off",
            ratios: ["4:3", "16:9"],
            ratio: "16:9",
            ps: "1920x1080",
            sizes: ["1920x1080"],
            pos: new Animated.Value(Dimensions.get("window").height),
        };
        this.isHidden = true
    }

    toggle() {
        if (this.isHidden) toPos = 0; else toPos = Dimensions.get("window").height

        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
            }
        ).start();

        this.isHidden = !this.isHidden;
        this.reloadResolutions();
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

    reloadResolutions = async () => {
        if (this.camera) {
            this.setState({
                sizes: await this.camera.getAvailablePictureSizesAsync(this.state.ratio)
            })

        }
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <View><Text>brak dostępu do kamery</Text></View>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type} whiteBalance={this.state.wb} flashMode={this.state.fm} ratio={this.state.ratio} pictureSize={this.state.ps}>
                        <Animated.View
                            style={[styles.animatedView, { transform: [{ translateY: this.state.pos }] }]} >
                            <ScrollView>
                                <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20, marginHorizontal: 10, color: "white" }}>SETTINGS</Text>
                                <RadioGroup data={Object.keys(Camera.Constants.WhiteBalance)} color="#F44336" direction="column"
                                    groupName="WHITE BALANCE" selectedIndex={Object.keys(Camera.Constants.WhiteBalance).indexOf(this.state.wb)} change={(i) => this.setState({ wb: Object.keys(Camera.Constants.WhiteBalance)[i] })} />
                                <RadioGroup data={Object.keys(Camera.Constants.FlashMode)} color="#F44336" direction="column"
                                    groupName="FLASH MODE" selectedIndex={Object.keys(Camera.Constants.FlashMode).indexOf(this.state.fm)} change={(i) => { this.setState({ fm: Object.keys(Camera.Constants.FlashMode)[i] }) }} />
                                <RadioGroup data={this.state.ratios} color="#F44336" direction="column"
                                    groupName="RATIO" selectedIndex={this.state.ratios.indexOf(this.state.ratio)} change={(i) => { this.setState({ ratio: this.state.ratios[i] }, () => { this.reloadResolutions(); this.setState({ ps: this.state.ratio == "16:9" ? "1920x1080" : "1440x1080" }) }); }} />
                                <RadioGroup data={this.state.sizes} color="#F44336" direction="column"
                                    groupName="RESOLUTIONS" selectedIndex={this.state.sizes.indexOf(this.state.ps)} change={(i) => { this.setState({ ps: this.state.sizes[i] }) }} />
                            </ScrollView>
                        </Animated.View>
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
        this.toggle()
    }
}

var styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        width: Dimensions.get("window").width * 2 / 3,
        height: Dimensions.get("window").height
    }
});


export default CameraScreen;
