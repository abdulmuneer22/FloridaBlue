//
//  WebViewController.m
//  FloridaBlue
//
//  Created by Wright, Brock on 5/9/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "YWebViewManager.h"
#import <React/RCTBridge.h>
@interface YWebViewManager ()
@end

@implementation YWebViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  NSLog(@"Rendering YWebView..");
  YWebView *webView = [[YWebView alloc] init];
  NSURL* url = [NSURL URLWithString:@"http://www.bing.com"];
  NSURLRequest* request = [NSURLRequest requestWithURL:url];
  [webView loadRequest:request];
  
  return webView;
}

@end
