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
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Flb name='arrow-left'
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={[styles.backButton, {marginTop:5}]}
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
    return <TouchableOpacity onPress={openDrawer.bind(null, 'settings')}>
      <Flb name='align-justify'
        size={Metrics.icons.medium}
        style={{color: Colors.snow,
          backgroundColor: Colors.transparent,
          marginTop: Metrics.baseMargin}}
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
