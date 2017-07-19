// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState } from 'react-native'
import NavigationRouter from '../../../Navigation/NavigationRouter'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from './QuoteStyle'

class Quote extends Component {
  constructor () {
    super()
    component = this
  }

  componentDidMount () {

  }

  render () {
    return (
      <View>
        <Text allowFontScaling={false}>Hello Quote!</Text>
      </View>
    )
  }
}

Quote.propTypes = {

}

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Quote)
