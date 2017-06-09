import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

import {Colors, Metrics, Fonts, Images} from '../../../Themes'
import Flb from '../../../Themes/FlbIcon'

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    backgroundColor: Colors.flBlue.grey3,
    zIndex: 1000
  },
  header: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5
  },
  row: {
    flexDirection: 'row'
  },
  optionContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#F2F3F4'
  },
  option: {
    height: 40,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  border: {
    borderBottomWidth: 2,
    borderBottomColor: '#DDD'
  }

})

class SelectBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this._handleChange = this._handleChange.bind(this)
    this._toggleMenu = this._toggleMenu.bind(this)
  }

  _toggleMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  _handleChange (selected) {
    if (this.props.onChange) {
      this.props.onChange(selected)
    }

    this.setState({
      isOpen: false
    })
  }

  _renderOptions (options) {
    return options.map((option) => {
      return <TouchableWithoutFeedback onPress={() => this._handleChange(option)} key={option.key}>
        <View style={[styles.option, styles.border, styles.row]}>
          <Text>{option.key}</Text>
        </View>
      </TouchableWithoutFeedback>
    })
  }

  render () {
    const { selected, options } = this.props
    const {isOpen} = this.state
    return <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={this._toggleMenu}>
        <View style={[styles.header, styles.row, styles.border]}>
          <View style={styles.row}>
            <Text>{selected.key}</Text>
            <Flb name='check' size={Metrics.icons.small} />
          </View>
          <Flb name={isOpen ? 'rd-u-arrow' : 'rd-d-arrow'} size={Metrics.icons.small} />
        </View>
      </TouchableWithoutFeedback>
      {
    this.state.isOpen ? <View style={styles.optionContainer}>
      {this._renderOptions(options)}
    </View> : null
  }
    </View>
  }
}

SelectBox.defaultProps = {
  selected: {
    key: 'Family',
    value: ''
  }
}

export default SelectBox
