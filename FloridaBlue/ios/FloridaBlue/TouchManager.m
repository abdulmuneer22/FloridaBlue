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
  [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"username"];
  [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"touchEnabled"];
  NSMutableDictionary * queryPrivateKey = [[NSMutableDictionary alloc] init];
  [queryPrivateKey setObject:(__bridge id)kSecValueData forKey:(__bridge id)kSecValueData];
  OSStatus deleteStatus = SecItemDelete((__bridge CFDictionaryRef)queryPrivateKey);
  
  if (deleteStatus == errSecSuccess) {
    [callbackArray addObject:@"FAILURE"];
  } else {
    [callbackArray addObject:@"SUCCESS"];
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
  NSString *username = [[NSUserDefaults standardUserDefaults] objectForKey:@"username"];
  NSMutableArray *callbackArray = [NSMutableArray new];
  
  BOOL canAuthenticate = [self canAuthenticateByTouchId];
  
  if (canAuthenticate) {
  if (touchEnabled && username != nil) {
    [callbackArray addObject:@"AUTHENTICATED"];
  } else if (touchEnabled && username == nil) {
    [callbackArray addObject:@"ENABLED"];
  } else {
    [callbackArray addObject:@"DISABLED"];
  }
  } else {
    [callbackArray addObject:@"UNAVAILABLE"];
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
                                NSLog(@"Authentication Failed");
                                authErrorCode = @"001";
                                break;
                                
                              case LAErrorUserCancel:
                                NSLog(@"User pressed Cancel button");
                                authErrorCode = @"002";
                                break;
                                
                              case LAErrorTouchIDLockout:
                                NSLog(@"Touch ID locked, too many failed attempts");
                                authErrorCode = @"000";
                                break;
                                
                              default:
                                NSLog(@"Touch ID is not configured");
                                authErrorCode = @"999";
                                break;
                            }
                          }
                          
                          [callbackDict setObject:didAuthorize forKey:@"authStatus"];
                          [callbackDict setObject:authErrorCode forKey:@"authErrorCode"];
                          [callbackArray addObject:callbackDict];
                          callback(@[[NSNull null], callbackArray]);
                        }];
  } else {
    authErrorCode = @"999";
    [callbackDict setObject:didAuthorize forKey:@"authStatus"];
    [callbackDict setObject:authErrorCode forKey:@"authErrorCode"];
    [callbackArray addObject:callbackDict];
    callback(@[[NSNull null], callbackArray]);
  }
}

- (BOOL)canAuthenticateByTouchId {
  if ([LAContext class]) {
    return [[[LAContext alloc] init] canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:nil];
  } else {
    return NO;
  }
}

@end
