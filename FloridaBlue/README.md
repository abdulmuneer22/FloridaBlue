#  FloridaBlue

## Setup
[Setup README](../README.md)

## NPM Install

```
cd FloridaBlue
npm install
```

## Run iOS
```
react-native run-ios
```

## Run Android
```
react-native run-android
```

## To generate Icons from style.css file

``` first go to the style.css file location using terminal and run the below command```

````/Users/f7ro/dev/flblue-mobile/FloridaBlue/node_modules/.bin/generate-icon styles.css --componentName=FlbIcon --fontFamily=flb > FlbIcon```

```after generating the FlBIcon.js file, copy that in our project under App/Themes/" ````
``` remove the existing flb.ttf file from IOS (got to Xcode -->Florida blue project --> resources) and replace it with new flb.ttf file and run the command "react-native link" ```
```` once u do all the steps, close all terminals and simulator. And run again in new terminal```
