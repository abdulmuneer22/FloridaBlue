// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  wrapper : {
    backgroundColor : 'white',
    flex : 1
  },
  SecurityHintTitle:{
    fontWeight : 'bold',
    margin : 10,
    fontSize : 12
  },
  SecurityHintWrapper : {
    flexDirection : 'row',
    marginLeft : 15,
    marginRight : 15,
    marginTop : 5,
    //borderColor : 'red',
    //borderWidth : 1
  },
  form : {
    width : window.width - 30,
    //borderColor : 'red',
    //borderWidth : 1,
    alignSelf : 'center',
    marginLeft : 20,
    marginRight : 20


  },
  click : {
    width: 25,
    height: 25,
    borderRadius: 25/2,
    backgroundColor: 'black',
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 5
  },
  modal: {
   justifyContent: 'center',
   alignItems: 'center'
 },
 modal4: {
    height: 200
  },
  textInput:{
    height: 30,
    borderBottomColor: '#000000',
    borderBottomWidth: 1


  }

});
