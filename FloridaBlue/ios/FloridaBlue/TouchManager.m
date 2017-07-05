//
//  TouchManager.m
//  FloridaBlue
//
//  Created by Wright, Brock on 5/9/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "TouchManager.h"

@implementation TouchManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(removeCredentials:(RCTResponseSenderBlock)callback) {
  NSMutableArray *callbackArray = [NSMutableArray new];
  
  BOOL usernameExists = [[NSUserDefaults standardUserDefaults] boolForKey:@"username"];
  BOOL touchExists = [[NSUserDefaults standardUserDefaults] boolForKey:@"touchEnabled"];
  
  if (usernameExists) {
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"username"];
  }
  
  if (touchExists) {
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"touchEnabled"];
    KeychainWrapper *keychain = [[KeychainWrapper alloc] init];
    [keychain resetKeychainItem];
    
    [callbackArray addObject:@"SUCCESS"];
  } else {
    [callbackArray addObject:@"NO EXISTING CREDENTIALS"];
  }
  
  callback(@[[NSNull null], callbackArray]);
}

RCT_EXPORT_METHOD(retrieveCredentials:(RCTResponseSenderBlock)callback) {
  KeychainWrapper *keychain = [[KeychainWrapper alloc] init];
  NSMutableArray *callbackArray = [NSMutableArray new];
  NSMutableDictionary *callbackDict = [NSMutableDictionary new];
  NSString *password = [keychain myObjectForKey:(id)kSecValueData];
  NSString *username = [[NSUserDefaults standardUserDefaults] objectForKey:@"username"];
  NSString *status = [NSString new];
  
  if (username && password) {
    status = @"SUCCESS";
  } else {
    status = @"FAILURE";
  }
  
  [callbackDict setObject:password forKey:@"password"];
  [callbackDict setObject:username forKey:@"username"];
  [callbackDict setObject:status forKey:@"status"];
  
  [callbackArray addObject:callbackDict];
  
  callback(@[[NSNull null], callbackArray]);
}

RCT_EXPORT_METHOD(storeCredentials:(NSString *)username password:(NSString *)password) {
  NSString *touchEnabled = @"YES";
  [[NSUserDefaults standardUserDefaults] setObject:touchEnabled forKey:@"touchEnabled"];
  [[NSUserDefaults standardUserDefaults] setObject:username forKey:@"username"];
  [[NSUserDefaults standardUserDefaults] synchronize];
  
  KeychainWrapper *keychain = [[KeychainWrapper alloc] init];
  [keychain mySetObject:password forKey:(id)kSecValueData];
  [keychain writeToKeychain];
}

RCT_EXPORT_METHOD(enableTouchID:(RCTResponseSenderBlock)callback) {
  NSString *touchEnabled = @"YES";
  [[NSUserDefaults standardUserDefaults] setObject:touchEnabled forKey:@"touchEnabled"];
  [[NSUserDefaults standardUserDefaults] synchronize];
  
  NSMutableArray *callbackArray = [NSMutableArray new];
  [callbackArray addObject:@"ENABLED"];
  
  callback(@[[NSNull null], callbackArray]);
}

RCT_EXPORT_METHOD(checkTouchStatus:(RCTResponseSenderBlock)callback) {
  BOOL touchEnabled = [[NSUserDefaults standardUserDefaults] boolForKey:@"touchEnabled"];
  BOOL username = [[NSUserDefaults standardUserDefaults] boolForKey:@"username"];
  NSMutableArray *callbackArray = [NSMutableArray new];
  LAContext *myContext = [[LAContext alloc] init];
  NSError *authError = nil;
  __block NSString *authErrorCode = @"";
  
  if ([myContext canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&authError]) {
    if (touchEnabled && username) {
      [callbackArray addObject:@"AUTHENTICATED"];
    } else if (touchEnabled && !username) {
      [callbackArray addObject:@"ENABLED"];
    } else {
      [callbackArray addObject:@"DISABLED"];
    }
  } else {
    switch (authError.code) {
      case LAErrorSystemCancel:
        authErrorCode = @"SYSTEM CANCEL";
        break;
      case LAErrorPasscodeNotSet:
        authErrorCode = @"NO PASSCODE";
        break;
      case LAErrorTouchIDNotAvailable:
        authErrorCode = @"UNAVAILABLE";
        break;
      case LAErrorTouchIDNotEnrolled:
        authErrorCode = @"NOT ENROLLED";
        break;
      case LAErrorTouchIDLockout:
        authErrorCode = @"LOCKED";
        break;
      default:
        authErrorCode = @"UNKNOWN";
        break;
    }
    [callbackArray addObject:authErrorCode];
  }
  
  
  callback(@[[NSNull null], callbackArray]);
}


RCT_EXPORT_METHOD(authenticateUser:(RCTResponseSenderBlock)callback) {
  LAContext *myContext = [[LAContext alloc] init];
  NSMutableArray *callbackArray = [NSMutableArray new];
  NSMutableDictionary *callbackDict = [NSMutableDictionary new];
  NSError *authError = nil;
  __block NSString *authErrorCode = @"";
  __block NSString *didAuthorize = @"NO";
  NSString *myLocalizedReasonString = @"Authenticate using your finger";
  
  myContext.localizedFallbackTitle = @"";
  
  if ([myContext canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&authError]) {
    [myContext evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics
              localizedReason:myLocalizedReasonString
                        reply:^(BOOL success, NSError *error) {
                          if (success) {
                            didAuthorize = @"YES";
                          } else {
                            didAuthorize = @"NO";
                            switch (error.code) {
                              case LAErrorAuthenticationFailed:
                                authErrorCode = @"AUTH FAILED";
                                break;
                              case LAErrorUserCancel:
                                authErrorCode = @"USER CANCEL";
                                break;
                              case LAErrorSystemCancel:
                                authErrorCode = @"SYSTEM CANCEL";
                                break;
                              case LAErrorPasscodeNotSet:
                                authErrorCode = @"NO PASSCODE";
                                break;
                              case LAErrorTouchIDNotAvailable:
                                authErrorCode = @"UNAVAILABLE";
                                break;
                              case LAErrorTouchIDNotEnrolled:
                                authErrorCode = @"NOT ENROLLED";
                                break;
                              case LAErrorTouchIDLockout:
                                authErrorCode = @"LOCKED";
                                break;
                              default:
                                authErrorCode = @"UNKNOWN";
                                break;
                            }
                          }
                          
                          [callbackDict setObject:didAuthorize forKey:@"authStatus"];
                          [callbackDict setObject:authErrorCode forKey:@"authErrorCode"];
                          [callbackArray addObject:callbackDict];
                          callback(@[[NSNull null], callbackArray]);
                        }
     ];
  } else {
    switch (authError.code) {
      case LAErrorAuthenticationFailed:
        authErrorCode = @"AUTH FAILED";
        break;
      case LAErrorUserCancel:
        authErrorCode = @"USER CANCEL";
        break;
      case LAErrorSystemCancel:
        authErrorCode = @"SYSTEM CANCEL";
        break;
      case LAErrorPasscodeNotSet:
        authErrorCode = @"NO PASSCODE";
        break;
      case LAErrorTouchIDNotAvailable:
        authErrorCode = @"UNAVAILABLE";
        break;
      case LAErrorTouchIDNotEnrolled:
        authErrorCode = @"NOT ENROLLED";
        break;
      case LAErrorTouchIDLockout:
        authErrorCode = @"LOCKED";
        break;
      default:
        authErrorCode = @"UNKNOWN";
        break;
    }
    
    [callbackDict setObject:didAuthorize forKey:@"authStatus"];
    [callbackDict setObject:authErrorCode forKey:@"authErrorCode"];
    [callbackArray addObject:callbackDict];
    
    callback(@[[NSNull null], callbackArray]);
  }
}

@end
