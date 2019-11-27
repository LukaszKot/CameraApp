import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./components/Main"
import Gallery from "./components/Gallery"
import CameraScreen from "./components/CameraScreen"
import BigPhoto from "./components/BigPhoto"
const Root = createStackNavigator({
  main: { screen: Main },
  gallery: { screen: Gallery },
  cameraScreen: { screen: CameraScreen },
  bigPhoto: { screen: BigPhoto }
});

const App = createAppContainer(Root);

export default App;