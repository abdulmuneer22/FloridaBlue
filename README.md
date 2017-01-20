# Florida Blue Mobile

## Setup

### mobsauce

mobsauce is required before you try to build the flblue-mobile app

Clone  mobsauce
```
cd ~/dev
git clone git@edclgitd101.bcbsfl.com:git-mob/mobsauce.git 
```

NPM Install
```
cd ~/dev/mobsauce
npm install
```

NPM Link - This installs mobsauce (and its generators), making it globally available
```
cd ~/dev/mobsauce
npm link
```

### flblue-mobile
Clone  flblue-mobile
```
cd ~
mkdir dev
cd ~/dev
git clone git@edclgitd101.bcbsfl.com:git-mob/flblue-mobile.git 
```

NPM Install
```
cd ~/dev/flblue-mobile/FloridaBlue
npm install
```

Run iOS
```
cd ~/dev/flblue-mobile/FloridaBlue
react-native run-ios
```

Run Android
```
cd ~/dev/flblue-mobile/FloridaBlue
react-native run-android
```
