// @flow

import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import styles from './Styles/NavItemsStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import IonicIcon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics, Images } from '../Themes'
import Flb from '../Themes/FlbIcon'

const openDrawer = (type) => {
  NavigationActions.refresh({
    key: 'drawer',
    contentType: type,
    open: true
  })
}

export default {
  backButton () {
    return (
      <TouchableOpacity style={{width: 50, height: 50, alignItems: 'center'}} onPress={NavigationActions.pop}>
        <Flb name='arrow-left'
          size={Metrics.icons.xm * Metrics.screenHeight * 0.0016}
          color={Colors.flBlue.ocean}
          style={styles.backButton}
        />
      </TouchableOpacity>
    )
  },

  errorBackButton () {
    return (
      <TouchableOpacity style={{width: 100, height: 100, alignItems: 'center'}} onPress={NavigationActions.pop}>
        <Flb name='arrow-left'
          size={Metrics.icons.large * Metrics.screenHeight * 0.0013}
          color={Colors.snow}
          style={[styles.backButton, {marginTop: Metrics.mediumMargin * Metrics.screenHeight * 0.0020}]}
        />
      </TouchableOpacity>
    )
  },
/*
  hamburgerButton () {
    return (
      <TouchableOpacity onPress={openDrawer.bind(null,'menu')}>
        <Icon name='bars'
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
    name='ios-more'
  }, */
  settingsButton () {
    return <TouchableOpacity style={{width: 50, height: 50, alignItems: 'center'}} onPress={openDrawer.bind(null, 'settings')}>
      <Flb name='align-justify'
        size={Metrics.icons.xm * Metrics.screenHeight * 0.0016}
        style={{color: Colors.flBlue.ocean,
          backgroundColor: Colors.transparent,
          marginTop: 15}}
    />
    </TouchableOpacity>
  },

  searchButton (callback: Function) {
    return (
      <TouchableOpacity onPress={callback}>
        <Icon name='search'
          size={Metrics.icons.small}
          color={Colors.snow}
          style={styles.searchButton}
        />
      </TouchableOpacity>
    )
  }

}
