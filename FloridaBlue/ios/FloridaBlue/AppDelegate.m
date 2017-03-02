/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  for (NSString* family in [UIFont familyNames])
  {
    NSLog(@"%@", family);
    for (NSString* name in [UIFont fontNamesForFamilyName: family])
    {
      NSLog(@" %@", name);
    }
   
  }

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"FloridaBlue"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
   [self loadHTTPCookies];
  return YES;
  
 

}


- (void)applicationDidEnterBackground:(UIApplication *)application
{
  //Other existing code
  
  [self saveHTTPCookies];
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
  [self loadHTTPCookies];
}

- (void)applicationWillTerminate:(UIApplication *)application
{
  //Other existing code
  [self saveHTTPCookies];
}

-(void)loadHTTPCookies
{
  NSMutableArray* cookieDictionary = [[NSUserDefaults standardUserDefaults] valueForKey:@"cookieArray"];
  
  for (int i=0; i < cookieDictionary.count; i++)
  {
    NSMutableDictionary* cookieDictionary1 = [[NSUserDefaults standardUserDefaults] valueForKey:[cookieDictionary objectAtIndex:i]];
    NSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:cookieDictionary1];
    [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];
  }
}

-(void)saveHTTPCookies
{
  NSMutableArray *cookieArray = [[NSMutableArray alloc] init];
  for (NSHTTPCookie *cookie in [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookies]) {
    [cookieArray addObject:cookie.name];
    NSMutableDictionary *cookieProperties = [NSMutableDictionary dictionary];
    [cookieProperties setObject:cookie.name forKey:NSHTTPCookieName];
    [cookieProperties setObject:cookie.value forKey:NSHTTPCookieValue];
    [cookieProperties setObject:cookie.domain forKey:NSHTTPCookieDomain];
    [cookieProperties setObject:cookie.path forKey:NSHTTPCookiePath];
    [cookieProperties setObject:[NSNumber numberWithUnsignedInteger:cookie.version] forKey:NSHTTPCookieVersion];
    [cookieProperties setObject:[[NSDate date] dateByAddingTimeInterval:2629743] forKey:NSHTTPCookieExpires];
    
    [[NSUserDefaults standardUserDefaults] setValue:cookieProperties forKey:cookie.name];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
  }
  
  [[NSUserDefaults standardUserDefaults] setValue:cookieArray forKey:@"cookieArray"];
  [[NSUserDefaults standardUserDefaults] synchronize];
}


@end


