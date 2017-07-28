import React, { Component, PropTypes } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    Alert,
    Platform,
    Linking,
    BackAndroid
} from 'react-native'
import ProviderActions from '../../../Redux/ProviderRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './ProgramDetailStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../Themes'
import Flb from '../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab, Card } from 'native-base'

import _ from 'lodash'

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()

class ProgramDetail extends Component {
  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.newHeaderImage}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
                Find Care
            </Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  render () {
    return (

      <View style={styles.container} >
        <View>
          {this._renderHeader()}
        </View>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{flex: 1}}>
              {this.props.configData && this.props.configData.programDetails && this.props.configData.programDetails.length > 0 ? this.props.configData.programDetails.map((value, i) => {
                return (<View key={i} style={{flex: 1}}>
                  <View style={{flex: 1, backgroundColor: Colors.flBlue.ocean}}>
                    <Text allowFontScaling={false} style={styles.h1}>
                      {value.headerText_en}
                    </Text>
                  </View>
                  {value.program ? value.program.map((programText, j) => {
                    return (

                      <View key={j} style={{flex: 1}}>
                        { programText.title_en
                          ? <Text allowFontScaling={false} style={styles.h2}>
                            {programText.title_en}
                          </Text>
                    : null}

                        { programText.descrption_en
                          ? <Text allowFontScaling={false} style={styles.h5}>
                            {programText.descrption_en}
                          </Text>
                    : null}

                        { programText.subDescrption_en
                          ? <Text allowFontScaling={false} style={styles.h4}>
                            {programText.subDescrption_en}
                          </Text>
                    : null}
                      </View>

                    )
                  }) : null
         }
                </View>

                )
              }

        )

        : null
        }
            </View>

          </ScrollView>
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.provider.fetching,
    error: state.provider.error,
    provider: state.provider.data,
    configData: state.provider.configData

  }
}

export default connect(mapStateToProps)(ProgramDetail)
