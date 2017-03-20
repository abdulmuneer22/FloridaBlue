// @flow

import React, { PropTypes } from 'react'
import ReactNative, {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Fonts, Images, Metrics } from '../../../../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './FindMemberIDStyle'

import Flb from '../../../../Themes/FlbIcon'
// I18n
import I18n from 'react-native-i18n'

import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'

class FindMemberID extends React.Component {
  _handleClose () {
    NavigationActions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image source={Images.registrationStep1Hdr} style={styles.headerImage} />
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('findMemberId')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>{I18n.t('findMemberIdDescription1')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>{I18n.t('findMemberIdDescription2')}</Text>
          </View>
          <Swiper height={Metrics.screenHeight * 0.39} style={styles.wrapper1} showsButtons>
            <View style={styles.slide}>
              <View style={styles.outofBox}>
                <Image
                  style={{
                    width: Metrics.screenWidth * 0.65,
                     // borderRadius:Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0015,
                   height:Metrics.screenHeight * 0.25
                  }}
                  source={Images.idCardFront}
                />
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.outofBox}>
                <Image
                  style={{
            
                    width: Metrics.screenWidth * 0.7,
                    //borderRadius:Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0015,
                    height:Metrics.screenHeight * 0.28
                  }}
                  source={Images.idCardBack}
                />
              </View>
            </View>
          </Swiper>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => { this._handleClose() }}>
              <Image style={{width: Metrics.screenWidth * 0.3,
                            borderRadius:Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                            height:Metrics.screenHeight * 0.05}} source={Images.closeButtonGray} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

FindMemberID.propTypes = {
  verifyIdentification: PropTypes.func,
  handleChangeContractNumber: PropTypes.func,
  handleChangeFirstName: PropTypes.func,
  handleChangeLastName: PropTypes.func,
  handleChangeDateOfBirth: PropTypes.func,
  handleChangeZipCode: PropTypes.func,
  fetching: PropTypes.bool,
  contractNumber: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dateOfBirth: PropTypes.string,
  zipCode: PropTypes.string,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.registration.fetching,
    contractNumber: state.registration.contractNumber,
    firstName: state.registration.firstName,
    lastName: state.registration.lastName,
    dateOfBirth: state.registration.dateOfBirth,
    zipCode: state.registration.zipCode,
    error: state.registration.error,
    data: state.registration.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyIdentification: (contractNumber, firstName, lastName, dateOfBirth, zipCode) => dispatch(RegistrationActions.registrationRequest(contractNumber, firstName, lastName, dateOfBirth, zipCode)),
    handleChangeContractNumber: (contractNumber) => dispatch(RegistrationActions.changeContractNumber(contractNumber)),
    handleChangeFirstName: (firstName) => dispatch(RegistrationActions.changeFirstName(firstName)),
    handleChangeLastName: (lastName) => dispatch(RegistrationActions.changeLastName(lastName)),
    handleChangeDateOfBirth: (dateOfBirth) => dispatch(RegistrationActions.changeDateOfBirth(dateOfBirth)),
    handleChangeZipCode: (zipCode) => dispatch(RegistrationActions.changeZipCode(zipCode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindMemberID)
