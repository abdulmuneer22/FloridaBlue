import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native'

import RegistrationToolBar from '../RegistrationToolBar'
import {Actions as NavigationActions} from 'react-native-router-flux'
import { Colors, Fonts, Images, Metrics } from '../../../../Themes'

// Styles
import styles from './ReadMoreStyle'

// I18n
import I18n from 'react-native-i18n'

class ReadMore extends Component {
  render () {
    return (
      <View style={styles.container}>
      <Image source={Images.registrationStep2Hdr} style={styles.headerImage} />

      <ScrollView>

          <Text style={styles.readMoreHeader}> Florida Blue Cross & Blue Shield </Text>

          <Text style={styles.readMoreSubHeader}> Privacy Notice </Text>

          <Text style={styles.paragraph}>
          By checking this box you agree to receive all communications from Florida Blue and Florida Blue HMO electronically at the email address provided above. This may include documents related to your application, enrollment, billing, benefits, health statements, and legal documents. Most documents will be available through your online member account and we will email you when you have a new document online.
          </Text>

          <Text style={styles.paragraph}>
          However, in certain cases we may still send you paper documents in the mail. Some of the information we communicate to you may be Protected Health Information (“PHI”) under the terms of the Health Insurance Portability and Accountability Act (“HIPAA”). By selecting electronic communication, you authorize us to release PHI to you electronically and agree that you are solely responsible and liable for the security of the email address you provide, the security of the computer system upon which you view the PHI, and the risks inherent in electronic communication. You have the right to designate a different email address at any time, and you should do so if you believe that the address you are providing today is no longer secure. You understand that failing to update your e-mail address may result in a delay or failure of notification of important information and/or the possible release of PHI to an unintended recipient.
          </Text>

          <Text style={styles.paragraph}>
          You also have the right to stop receiving documents electronically at any time or request a free paper copy of any communication by logging on to your online Member account or calling us. By agreeing to receive electronic documents you confirm that you have provided a working, private email address, that you have  internet access and  a current and updated web browser and that you can open PDF files using the current version of  Adobe Acrobat Reader or its equivalent.
          </Text>

        </ScrollView>

        <TouchableHighlight style={styles.closeButton} onPress={() => { NavigationActions.pop() }}>
          <Text style={{color: 'white'}}> Close </Text>
        </TouchableHighlight>

      </View>
    )
  }
}
export default ReadMore
