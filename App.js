import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Alert, NativeModules } from 'react-native'
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation';

export default class MyWeb extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    Orientation.lockToLandscape();
    fetch('https://mik-fungmae.github.io/bacc/config.json', {
        headers: {
          'Cache-Control': 'no-cache'
        }
    }).then((n) => {
      return n.json()        
    }).then((n) => {
      window.url = n.url
      if (n.url != "") {
        Orientation.lockToPortrait()
      }
      this.setState({
        key: 1,
        url: n.url
      })
    }).catch(function(t) {
        console.log(t)
    })
  }

  render() {
    var bar = (<View style={{height: 50, justifyContent:"space-around", flexDirection:"row", alignItems: "center"}}>
            <TouchableOpacity onPress={() => {
              if (this.state.url.endsWith("?")) {
                this.setState({
                  url: "window.url"
                })
              } else {
                this.setState({
                  url: window.url  + "?"
                })
              }
            }}>
              <Image source={{uri: 'icon_home'}} style={{width: 40, height: 40}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.myRef.current.goBack()
            }}>
            <Image source={{uri: 'icon_back'}} style={{width: 40, height: 40}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.myRef.current.goForward()
            }}>
              <Image source={{uri: 'icon_forward'}} style={{width: 40, height: 40}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.myRef.current.reload()
            }}>
              <Image source={{uri: 'icon_refresh'}} style={{width: 40, height: 40}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {

              Alert.alert(
                '提示',
                '是否退出 App',
                [
                  {text: '不要', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: '好', onPress: () => NativeModules.Helper.addEvent('Birthday Party', '4 Privet Drive, Surrey')},
                ],
                { cancelable: false }
              )
            }}>
              <Image source={{uri: 'icon_exit'}} style={{width: 40, height: 40}} />
            </TouchableOpacity>
          </View>
        );

    var webView = (<WebView
          useWebKit={true}
          originWhitelist={["*"]}
          scrollEnabled={this.state ? (this.state.url ? true : false) : false}
          source={{ uri: 'https://lagged.com/api/play2/stickworld7/' }}
          onLoad={syntheticEvent => {
            window.a = this
            // get css rule
            this.myRef.current.injectJavaScript("function getStyle(className_) {var styleSheets = window.document.styleSheets;var styleSheetsLength = styleSheets.length;for (var i = 0; i < styleSheetsLength; i++) {var classes = styleSheets[i].rules || styleSheets[i].cssRules;if (!classes) continue;var classesLength = classes.length;	console.log(classes[x]);for (var x = 0; x < classesLength; x++) {if (classes[x].selectorText != undefined && classes[x].selectorText.search(className_) != -1) {return classes[x];}}}}")
            // remove ad and sdk
            this.myRef.current.injectJavaScript("setTimeout(function(){getStyle('\\\\*') ? getStyle('\\\\*').style['-webkit-user-select'] = 'none' : 0;getStyle('#leaderboard-loading') ? getStyle('#leaderboard-loading').style.display = 'none' : 0;getStyle('#leaderboard-modal') ? getStyle('#leaderboard-modal').style.display = 'none' : 0;getStyle('#logo-preloader') ? getStyle('#logo-preloader').style.display = 'none' : 0;window.LaggedAPI={APIAds:{show:function(o,n,e,s){console.log('APIAds.show'),console.log(o),console.log(n),console.log(e),console.log(s)}},Achievements:{save:function(o,n){},show:function(){}},Scores:{save:function(o,n){ReactNativeWebView.postMessage(String(o.score)),console.log('Scores.save'),console.log(o.score)},load:function(o,n){}},init:function(o,n){}};}, 500);")
            // inject for more game
            this.myRef.current.injectJavaScript("var timer=setInterval(function(){null!=window.exportRoot&&null!=window.exportRoot.children&&exportRoot.children.length>5&&null!=exportRoot.children[5].x&&(clearInterval(timer),exportRoot.children[5].x=-3e3,exportRoot.stage.update())},500);")
            // remove menu more game buttom
            this.myRef.current.injectJavaScript("var timer1=setInterval(function(){null!=window.exportRoot&&null!=window.exportRoot.children&&exportRoot.children.length>7&&exportRoot.children[7].children.length>6&&null!=exportRoot.children[7].children[6].x&&(clearInterval(timer1),exportRoot.children[7].children[6].x=-3e3,exportRoot.children[7].children[5].y = 350,exportRoot.stage.update())},10);")
          }}
          style={{zIndex: 1 }}
          javaScriptEnabled = {true}
          allowFileAccess = {true} 
          ref = {this.myRef}
          key = {1}
          onShouldStartLoadWithRequest={request => {
            // Only allow navigating within this website
            return request.url.startsWith('https://lagged.com');
          }}
          mediaPlaybackRequiresUserAction = {false}
          onNavigationStateChange={navState => {
            if (!navState.url.startsWith("http")) {
              NativeModules.Helper.show(navState.url)
            }
          }}
        />)
    return (
      <View style={{
        flex: 1,
        marginTop: 0,
        backgroundColor: "#EFEFF4"
      }}>
        { this.state ? (this.state.url ? webView : webView) : webView }
        
        { 
          this.state ? (this.state.url ? bar : null) : null

        }
      </View>
    );
  }
}