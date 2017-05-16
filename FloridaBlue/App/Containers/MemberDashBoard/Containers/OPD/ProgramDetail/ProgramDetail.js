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

import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './ProgramDetailStyle'
import NavItems from '../../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
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
      <Text style={styles.headerTextStyle}>
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
            <View style={{flex: 1, backgroundColor: Colors.flBlue.ocean}}>
              <Text style={styles.h1}>
          Value Based Programs
         </Text>
            </View>
            <Text style={styles.h2}>
        Value Choice Providers
        </Text>
            <Text style={styles.h5}>
As a Florida Blue member, Value Choice Providers offer a reduced cost for sick and wellness visits any time you need them.
 </Text>
            <Text style={styles.h2}>
Patient Centered Medical Home
</Text>
            <Text style={styles.h5}>
An integrated health care delivery model that provides comprehensive, continuous, coordinated medical care, wellness and preventive services to patients with a goal of improving health care outcomes.  The PCMH provides a physician directed team of healthcare workers to provide members with increased access, whole-person orientation, coordinated care, focused education and improved communication.
 </Text>
            <Text style={styles.h2}>
Accountable Care Program
</Text>
            <Text style={styles.h5}>
A group of health care providers, such as family practice, specialists and hospitals that form an Accountable Care Program (ACP). The goal of this program is to improve the health of the patients they serve by working together to deliver quality and costefficient care.
 </Text>
            <Text style={styles.h2}>
Blue Physician Recognition Program
</Text>
            <Text style={styles.h5}>
Primary care physicians (family practice, internal medicine and pediatricians) that have shown a commitment to quality and patient-centered care (such as ACP or PCHM). Some specialize in conditions, such as diabetes, asthma, COPD and heart problems. This does not mean they offer a higher standard of care than other doctors, only that they participate in this program.
 </Text>
            <Text style={styles.h2}>
Cardiology Care Collaborative
</Text>
            <Text style={styles.h5}>
Improved patient access, education and decision making through the utilization of multiple decision support systems supported by the American College of Cardiology (ACC).
</Text>
            <View style={{flex: 1, backgroundColor: Colors.flBlue.ocean}}>
              <Text style={styles.h1}>
Recognitions
 </Text>
            </View>
            <Text style={styles.h2}>
Community Provider
</Text>
            <Text style={styles.h5}>
A health care provider (doctor, hospital or clinic) that works with underserved people and communities that may not otherwise get the medical care they need.
 </Text>
            <Text style={styles.h2}>
Indian Health Provider
</Text>
            <Text style={styles.h5}>
Indian health providers include Indian Health Service, tribes, tribal organizations and urban Indian organization providers that serve American Indians and Alaskan Natives.
 </Text>
            <Text style={styles.h2}>
Physician Discount Offer
</Text>
            <Text style={styles.h5}>
These are participating physicians that may offer members a discount of 25% or more for non-covered services. This offer is not part of your insurance coverage or a discount medical plan. Please discuss the cost for non-covered services with your physician before your appointment, as these discounts are not guaranteed.
 </Text>
            <Text style={styles.h2}>
Disability Distinction
</Text>
            <Text style={styles.h5}>
Providers who have completed and passed Florida Blue’s training to improve their understanding of the unique rights and needs of patients with disabilities. The training includes an overview of disability regulations, information about health disparities and tips on how to make the provider office more accessible so that patients with disabilities have access to formats and accommodations they need to receive care.
 </Text>
            <Text style={styles.h2}>
Diagnostic Imaging Facility
</Text>
            <Text style={styles.h5}>
This provider has participated in Florida Blue’s diagnostic imaging quality program and has met the accreditation criteria for one or more advance imaging diagnostic services.
 </Text>
            <Text style={styles.h2}>
Nurse Magnet
</Text>
            <Text style={styles.h5}>
The American Nurse Credentialing Center (ANCC) Magnet Recognition Program recognizes health care organizations that provide the very best in nursing care and professionalism in nurse practicing.
 </Text>
            <Text style={styles.h4}>
Florida Blue is a trade name of Blue Cross and Blue Shield of Florida, Inc., an Independent Licensee of the Blue Cross and Blue Shield Association.

        </Text>
          </ScrollView>
        </View>

      </View>
    )
  }
}

export default ProgramDetail
