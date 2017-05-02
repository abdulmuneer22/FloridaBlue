# Florida Blue Mobile

## Setup

### Create .npm-global directory
Create .npm-global directory
```
cd ~
mkdir .npm-global
```

### Create ~/.npmrc (be sure to replace with your own racf)
vi ~/.npmrc
```
prefix=/Users/<racf>/.npm-global
```

### Install react-native-cli
Install react-native-cli
```
npm install -g react-native-cli
```

### Install yo
Install yo
```
npm install -g yo
```

### Clone flblue-mobile repository
Clone flblue-mobile
```
git clone git@edclgitd101.bcbsfl.com:git-mob/flblue-mobile.git 
```

### Install generator-apisauce-mod

generator-apisauce-mod is required before you try to build the flblue-mobile app

NPM Install & Link
```
cd generator-apisauce-mod
npm install
npm link
```

### Build FloridaBlue mobile app

NPM Install
```
cd FloridaBlue
npm install
react-native link react-native-config
```

Run iOS
```
react-native run-ios
```

Run Android
```
react-native run-android
```
