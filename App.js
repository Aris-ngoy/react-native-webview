import React, { Component } from 'react';
import { WebView,View ,ActivityIndicator,Dimensions,Platform,BackHandler,WEBVIEW_REF} from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  
  render() {

    var {height, width} = Dimensions.get('window');

    return (
      <View style={{ flex: 1 }}>
        <WebView
          onLoad={() => this.hideSpinner()}
          style={{ flex: 1,marginTop: Platform.OS === 'ios' ? 20 : 0 }}
          source={{uri: 'https://github.com/facebook/react-native'}}
          ref={(webView) => { this.webView.ref = webView; }}
          onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
        />
        {this.state.visible && (
          <ActivityIndicator
            style={{ position: "absolute",top: height / 2, left: width * 0.45 }}
            color="blue"
            size="large"
          />
        )}
      </View>
    );
  }
}

export default App;