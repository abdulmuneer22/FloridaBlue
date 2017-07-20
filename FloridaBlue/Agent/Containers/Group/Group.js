// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState } from 'react-native'
import NavigationRouter from '../../../Navigation/NavigationRouter'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from './GroupStyle'

class Group extends Component {
  constructor () {
    super()
    component = this
  }

  componentDidMount () {

  }

  render () {
    return (
      <View>
        <Text allowFontScaling={false}>Hello Group!</Text>
      </View>
    )
  }
}

Group.propTypes = {

}

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Group)
