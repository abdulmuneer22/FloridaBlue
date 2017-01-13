  <View style={Styles.wrapper}>
       <RegistrationToolBar/>
       <View style={{
         flexDirection : 'row',
         height : 35
       }}>
         <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(125, 135, 139)'}]}>
         <Text>
         1
         </Text>
         </View>
         <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(206, 214, 217)'}]}>
         <Text>
         2
         </Text>
         </View>
         <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(206, 214, 217)'}]}>
         <Text>
         3
         </Text>
         </View>
         <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(206, 214, 217)'}]}>
         <Text>
         4
         </Text>
         </View>
         <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(206, 214, 217)'}]}>
         <Text>
         5
         </Text>
         </View>
       </View>
       <View style={Styles.form}>
       <KeyboardAwareScrollView>
       <Text>
       Please complete all the fields below.
       </Text>
       <Input placeholder="Member ID" keyboardType="default"/>
       <View style={{
         flexDirection : 'row',
         paddingTop : 10,
         alignItems : 'center',
         marginRight : 10,
         marginTop : 15,
         marginBottom : 10
       }}>
         <Text style={Styles.errormessage}>
         Cant find your member ID ?
         </Text>
         <Button title="FIND IT HERE" color ={'rgb(26, 147, 216 )'} target="memberid"/>
       </View>
       <Input placeholder="First Name" keyboardType="default"/>
       <Input placeholder="Last Name" keyboardType="default"/>
       <Input placeholder="Date of Birth" keyboardType="numbers-and-punctuation"/>
       <Text style={{
         alignSelf : 'flex-end',
         color : 'grey',
         marginRight : 15
       }}>
       mm/dd/yyyy
       </Text>
       <Input placeholder="Zip Code" keyboardType="numeric"/>
       </KeyboardAwareScrollView>
       </View>
       <View style={{
         bottom : 30,
         flexDirection : 'row',
         position : 'absolute',
         marginLeft : 25,
         marginRight : 25
       }}>
       <View style={{flex : 1}}>
       <Button title="Back" color ={'rgb(211, 215, 218)'}  target="Back"/>
       </View>
       <View style={{flex : 1}}>
       </View>
       <View style={{flex : 1}}>
       <Button title = "Next" color ={'rgb(88, 96, 100 )'} target="screen_2"/>
       </View>
       </View>
     </View>




     <ScrollView style={styles.scrollView}
             contentContainerStyle={styles.container}>

     <View style={styles.row}>
     <View style={mdlstyles.col}>
     <TextfieldWithFloatingLabel ref="defaultInput"/>
      <Text style={mdlstyles.legendLabel}>With floating label</Text>
      </View>
      <View style={styles.row}>
      <View style={mdlstyles.col}>
            <PasswordInput/>
            <Text style={styles.legendLabel}>With floating label</Text>
          </View>
        </View>
      </View>

      </ScrollView>
