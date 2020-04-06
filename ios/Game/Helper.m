// Helper.m
#import "Helper.h"
#import <UIKit/UIKit.h>

@implementation Helper

// To export a module named CalendarManager
RCT_EXPORT_MODULE();

// This would name the module AwesomeCalendarManager instead
// RCT_EXPORT_MODULE(AwesomeCalendarManager);

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
//  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
  exit(0);
}

RCT_EXPORT_METHOD(show:(NSString *)name)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [UIApplication.sharedApplication openURL:[NSURL URLWithString:name]];
  });
}

@end
