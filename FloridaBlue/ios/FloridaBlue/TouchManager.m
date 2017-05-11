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

RCT_EXPORT_METHOD(storeCredentials:(NSString *)username location:(NSString *)password) {
  RCTLogInfo(@"Storing credentials %@ and %@", username, password);
}

RCT_EXPORT_METHOD(retrieveCredentials:(RCTResponseSenderBlock)callback) {
  KeychainWrapper *keychain = [[KeychainWrapper alloc] init];
  NSMutableArray *callbackArray = [NSMutableArray new];
  NSString *password = [keychain myObjectForKey:(id)kSecValueData];
  NSString *username = [[NSUserDefaults standardUserDefaults] objectForKey:@"username"];
  
  [callbackArray addObject:password];
  [callbackArray addObject:username];
  
  callback(@[[NSNull null], callbackArray]);
}

RCT_EXPORT_METHOD(enableTouchID:(NSString *)username password:(NSString *)password) {
  NSString *touchEnabled = @"YES";
  [[NSUserDefaults standardUserDefaults] setObject:touchEnabled forKey:@"touchEnabled"];
  [[NSUserDefaults standardUserDefaults] setObject:username forKey:@"username"];
  [[NSUserDefaults standardUserDefaults] synchronize];
  
  KeychainWrapper *keychain = [[KeychainWrapper alloc] init];
  [keychain mySetObject:password forKey:(id)kSecValueData];
  [keychain writeToKeychain];
}

RCT_EXPORT_METHOD(checkTouchStatus:(RCTResponseSenderBlock)callback) {
  BOOL touchEnabled = [[NSUserDefaults standardUserDefaults] boolForKey:@"touchEnabled"];
  NSMutableArray *callbackArray = [NSMutableArray new];
  
  if (touchEnabled) {
    [callbackArray addObject:@"YES"];
  } else {
    [callbackArray addObject:@"NO"];
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
                                
                              case LAErrorUserFallback:
                                NSLog(@"User pressed \"Enter Password\"");
                                authErrorCode = @"003";
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

@end
