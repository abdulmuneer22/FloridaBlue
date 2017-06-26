
import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image, TouchableHighlight,
  Animated
} from 'react-native'
import { Images, Colors, Metrics, Fonts } from '../../../Themes'
import Flb from '../../../Themes/FlbIcon'

class Panel extends Component {
  constructor (props) {
    super(props)
    this.icons = {
      'up': 'chevron-up',
      'down': 'chevron-down'
    }
    this.state = {
      firstTimeCollapse: false,
      title: props.title,
      expanded: false,
      animation: new Animated.Value()
    }
  }

  toggle () {
    let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
      finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight

    this.setState({
      expanded: !this.state.expanded
    })

    this.state.animation.setValue(initialValue)
    /*Animated.spring(
            this.state.animation,
      {
        toValue: finalValue
      }
        ).start()
        */
    Animated.timing(this.state.animation, {toValue: finalValue}).start();
  }

  _setMaxHeight (event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    })
  }

  _setMinHeight (event) {
    if (!this.state.firstTimeCollapse) {
      this.state.animation.setValue(event.nativeEvent.layout.height)
      this.setState({firstTimeCollapse: !this.state.firstTimeCollapse})
    }
    this.setState({
      minHeight: event.nativeEvent.layout.height
    })
  }

  render () {
    let icon = this.icons['down']

    if (this.state.expanded) {
      icon = this.icons['up']
    }

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.toggle.bind(this)}
        underlayColor={Colors.snow}>
        <Animated.View
          style={[styles.container, {height: this.state.animation}]}>
          <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
            <Text allowFontScaling={false} style={styles.title}>{this.state.title}</Text>

            <Flb name={icon} size={Metrics.icons.tiny * Metrics.screenWidth * 0.0025} style={{ marginTop: 15, backgroundColor: Colors.transparent }}
              color={Colors.flBlue.purple} />

          </View>

          <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>

            {this.props.children}
          </View>

        </Animated.View>
      </TouchableOpacity>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row'
  },

  title: {
    flex: 1,
    padding: 8,
    fontFamily: Fonts.type.subHeaderFont,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.purple,
    fontWeight: '600'
  },
  button: {
// width:20
  },
  buttonImage: {
    width: 30,
    height: 25
  },
  body: {
    //    borderTopWidth: 0.3,
     //   marginTop:10,
// width:Metrics.screenWidth * 0.8
        // bottom: 10

    margin: 10,
    paddingTop: 10
  }
})

export default Panel
