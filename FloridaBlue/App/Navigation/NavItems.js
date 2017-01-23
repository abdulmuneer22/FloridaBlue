// @flow

import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './Styles/NavItemsStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import IonicIcon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../Themes'

const openDrawer = (type) => {
  NavigationActions.refresh({
    key: 'drawer',
    contentType:type,
    open: true
  })
}

export default {
  backButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon name='angle-left'
          size={Metrics.icons.large}
          color={Colors.snow}
          style={[styles.backButton, {top:-10}]}
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
  },*/
  settingsButton () {
    return <TouchableOpacity onPress={openDrawer.bind(null,'settings')}>
      <Icon
        name='bars'
        size={Metrics.icons.large}
        style={{color:Colors.snow,marginTop:5}}
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
