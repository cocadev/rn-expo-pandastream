import React, { PureComponent } from 'react'
import { KeyboardAvoidingView, Platform, StatusBar, View, StyleSheet, Image } from 'react-native'
import { Scene, Router, Stack } from 'react-native-router-flux';
import { screenWidth, screenHeight } from './src/config/static';
import Constants from 'expo-constants';
import Normal from './src/screens/getstreamchat/normal';
import Home from './src/screens/home';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import All from './src/screens/getstreamchat/all';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const MAIN = [
  { key: 'home', component: Home },
  { key: 'normal_chat', component: Normal },
  { key: 'all_chat', component: All },

]

export default class App extends PureComponent {

  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    this.getPermissionAsync(); //ios image picker available

    await Font.loadAsync({
      'Muli-Light': require('./assets/fonts/Muli-Light.ttf'),
      'Muli-Italic': require('./assets/fonts/Muli-Italic.ttf'),     
    });

    this.setState({ fontLoaded: true });
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  render() {

    const { fontLoaded } = this.state;
    if (!fontLoaded) {
      return <Image source={require('./assets/splash.png')} style={{ width: screenWidth, height: screenHeight }} />
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null} enabled
        style={{ flex: 1 }}
      >
        <MyStatusBar backgroundColor="#1e88e5" barStyle="light-content" />
        <Router>
          <Stack key='root'>
            {MAIN.map(a => (<Scene key={a.key} component={a.component} hideNavBar />))}
          </Stack>
        </Router>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    padding: 10,
    height: 24,
  },
  content: {
    flex: 1,
    backgroundColor: '#2699FB',
  },
});