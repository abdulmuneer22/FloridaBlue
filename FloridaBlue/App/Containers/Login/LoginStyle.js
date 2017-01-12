// @flow

import { StyleSheet } from 'react-native'
import { Metrics, Colors, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  wrapper : {
    //borderColor : 'black',
    //borderWidth : 1,
    justifyContent : 'center',
    alignItems :'center',
    paddingTop : 40,
    paddingBottom : 60,

  },
  textInput : {
    width : window.width - 80,
    height: 40,
    borderColor: 'rgba(213, 211, 200 , 0.9)',
    borderWidth: 1,
    marginLeft : 40,
    marginRight : 40,
    marginBottom : 10,
    marginTop : 20,
    borderRadius : 3,
    padding : 6
  },
  forgotPassword : {
     alignItems: 'center',
  },
  button : {
    backgroundColor : 'rgba(17, 147, 203,0.9)',
    width : 100,
    padding : 9,
    borderColor : 'rgba(17, 147, 203,0.9)',
    borderRadius : 7,
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 40,
    marginBottom : 40
  },
  buttonText : {
    color : 'rgba(242, 246, 247   ,0.9)',
    fontWeight : 'bold'
  },
  regularText : {
    color : 'rgb(0, 0, 0)'
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    backgroundColor: '#58D3F7',
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 20

  },
  popupchild:{
    width : window.width / 2 - 10 ,
    //backgroundColor : 'yellow',
    padding : 10,
    height : 40,
    flexDirection : 'row' ,
    alignItems : 'center'
  },
  popupchildText : {
    fontSize : 14,
    marginLeft : 5,
    alignSelf : 'center'
  },
  logincard :{
    backgroundColor :Colors.snow,
    margin : Metrics.baseMargin,
    borderRadius : 20,
    flex : 1,
    paddingTop : 20,
    paddingBottom : 20,
    width :300,
    alignSelf :'center'
  }


})
