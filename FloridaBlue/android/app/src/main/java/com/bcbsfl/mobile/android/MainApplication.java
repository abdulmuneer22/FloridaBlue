package com.bcbsfl.mobile.android;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.joshblour.reactnativepermissions.ReactNativePermissionsPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import com.i18n.reactnativei18n.ReactNativeI18n;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new FIRMessagingPackage(),
            new CookieManagerPackage(),
            new LinearGradientPackage(),
            new LinearGradientPackage(),
            new MapsPackage(),
            new ReactMaterialKitPackage(),
            new VectorIconsPackage(),
            new ReactNativeI18n(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
            new ReactNativePermissionsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
