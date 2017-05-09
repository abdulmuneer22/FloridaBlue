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

RCT_EXPORT_METHOD(checkTouchStatus:(RCTResponseSenderBlock)callback) {
  BOOL touchConfigured = [[NSUserDefaults standardUserDefaults] boolForKey:@"touchEnabled"];
  NSMutableArray *callbackArray = [NSMutableArray new];
  
  if (touchConfigured) {
    [callbackArray addObject:@"YES"];
  } else {
    [callbackArray addObject:@"NO"];
  }
  
  callback(@[[NSNull null], callbackArray]);
}

RCT_EXPORT_METHOD(authenticateUser:(RCTResponseSenderBlock)callback) {
  KeychainWrapper *keychain = [[KeychainWrapper alloc] init];
  LAContext *myContext = [[LAContext alloc] init];
  NSMutableArray *callbackArray = [NSMutableArray new];
  NSMutableDictionary *callbackDict = [NSMutableDictionary new];
  NSError *authError = nil;
  __block NSString *authErrorString = @"";
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
                                authErrorString = @"Authentication Failed";
                                break;
                                
                              case LAErrorUserCancel:
                                NSLog(@"User pressed Cancel button");
                                authErrorString = @"User pressed Cancel button";
                                break;
                                
                              case LAErrorUserFallback:
                                NSLog(@"User pressed \"Enter Password\"");
                                authErrorString = @"User pressed \"Enter Password\"";
                                break;
                                
                              default:
                                NSLog(@"Touch ID is not configured");
                                authErrorString = @"Touch ID is not configured";
                                break;
                            }
                          }
                          
                          [callbackDict setObject:didAuthorize forKey:@"authStatus"];
                          [callbackDict setObject:authErrorString forKey:@"authError"];
                          [callbackArray addObject:callbackDict];
                          callback(@[[NSNull null], callbackArray]);
                        }];
  } else {
    authErrorString = @"Can not evaluate Touch ID";
    [callbackDict setObject:didAuthorize forKey:@"authStatus"];
    [callbackDict setObject:authErrorString forKey:@"authError"];
    [callbackArray addObject:callbackDict];
    callback(@[[NSNull null], callbackArray]);
  }
}

@end
