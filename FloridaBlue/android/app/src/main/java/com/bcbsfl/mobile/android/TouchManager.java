package com.bcbsfl.mobile.android;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.KeyguardManager;
import android.content.SharedPreferences;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyPermanentlyInvalidatedException;
import android.security.keystore.KeyProperties;
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;
import android.os.Build;
import android.support.v4.app.ActivityCompat;
import android.content.pm.PackageManager;
import android.content.Context;
import android.Manifest;
import android.util.Base64;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.reflect.Array;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SignatureException;
import java.security.UnrecoverableEntryException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.util.ArrayList;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;

import static com.bcbsfl.mobile.android.AppConstants.DEFAULT_KEY_NAME;
import static com.bcbsfl.mobile.android.AppConstants.DIALOG_FRAGMENT_TAG;

/**
 * Created by g6ep on 8/1/17.
 */

public class TouchManager extends ReactContextBaseJavaModule {
    private static final String TAG = TouchManager.class.getSimpleName();
    private static final String SAMPLE_ALIAS = "FLBAlIAS";
    private KeyStore mKeyStore;
    private KeyGenerator mKeyGenerator;
    private Cipher defaultCipher;
    private Callback authenticationCallback;

    public TouchManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TouchManager";
    }

    @ReactMethod
    public void checkTouchStatus(Callback touchStatus) {
        boolean isRooted = RootUtil.isDeviceRooted();
        boolean isSensorAvailable = checkFingerSensor();
        Context reactContext = getReactApplicationContext();

        SharedPreferences sharedPref = reactContext.getSharedPreferences("FL_BLUE_PREFERENCES", Context.MODE_PRIVATE);
        String touchEnabled = sharedPref.getString("touchEnabled", "NO");
        String username = sharedPref.getString("username", "");

        if (isRooted) {
            touchStatus.invoke("ROOTED");
        } else {
            if (isSensorAvailable) {
                if (touchEnabled == "YES" && username == "YES") {
                    touchStatus.invoke("AUTHENTICATED");
                } else if (touchEnabled == "YES" && username == "") {
                    touchStatus.invoke("ENABLED");
                } else {
                    touchStatus.invoke("DISABLED");
                }
            } else {
                touchStatus.invoke("UNAVAILABLE");
            }
        }
    }

    @ReactMethod
    public void enableFingerprint(Callback enableStatus) {
        Context reactContext = getReactApplicationContext();

        SharedPreferences sharedPref = reactContext.getSharedPreferences("FL_BLUE_PREFERENCES", Context.MODE_PRIVATE);
        sharedPref.edit().putString("touchEnabled", "YES").commit();

        enableStatus.invoke("ENABLED");
    }

    @ReactMethod
    public void retrieveCredentials(Callback retrievalStatus) {
        String encryptedJSONFromFile = readFromFile();
        String decryptedJSON = decryptText(encryptedJSONFromFile);

        if (null != decryptedJSON) {
            try {
                JSONObject decryptedJSONObject = new JSONObject(decryptedJSON);
                WritableNativeMap resultData = new WritableNativeMap();
                WritableNativeArray callbackArray = new WritableNativeArray();

                resultData.putString("status", "SUCCESS");
                resultData.putString("username", decryptedJSONObject.getString("username"));
                resultData.putString("password", decryptedJSONObject.getString("password"));

                callbackArray.pushMap(resultData);

                retrievalStatus.invoke(callbackArray);
            } catch (JSONException e) {
                e.printStackTrace();
                retrievalStatus.invoke("FAILURE");
            }
        } else {
            WritableNativeMap resultData = new WritableNativeMap();
            WritableNativeArray callbackArray = new WritableNativeArray();

            resultData.putString("status", "FAILURE");
            callbackArray.pushMap(resultData);

            retrievalStatus.invoke(callbackArray);
        }
    }

    @ReactMethod
    public void removeCredentials(Callback removalStatus) {
        Context reactContext = getReactApplicationContext();
        SharedPreferences sharedPref = reactContext.getSharedPreferences("FL_BLUE_PREFERENCES", Context.MODE_PRIVATE);

        if (sharedPref.contains("username") && sharedPref.contains("touchEnabled")) {
            sharedPref.edit().remove("username").commit();
            sharedPref.edit().remove("touchEnabled").commit();

            reactContext.deleteFile(new File(reactContext.getFilesDir(), "config.txt").getName());

            removalStatus.invoke("SUCCESS");
        } else {
            removalStatus.invoke("NO EXISTING CREDENTIALS");
        }
    }

    @ReactMethod
    public void storeCredentials(String username, String password) {
        Context reactContext = getReactApplicationContext();
        JSONObject newCredentials = new JSONObject();

        try {
            newCredentials.put("username", username);
            newCredentials.put("password", password);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        SharedPreferences sharedPref = reactContext.getSharedPreferences("FL_BLUE_PREFERENCES", Context.MODE_PRIVATE);
        sharedPref.edit().putString("touchEnabled", "YES").commit();
        sharedPref.edit().putString("username", "YES").commit();

        generateKey();

        if (cipherInit()) {
            String encryptedCredentialObject = encryptText(newCredentials.toString());
            writeToFile(encryptedCredentialObject);
        }

    }

    @ReactMethod
    public void authenticateUser(Callback authenticationStatus) {
        boolean isRooted = RootUtil.isDeviceRooted();
        boolean isSensorAvailable = checkFingerSensor();
        Activity activityContext = getCurrentActivity();
        this.authenticationCallback = authenticationStatus;

        if (isRooted) {
            authenticationStatus.invoke("ROOTED");
        } else {
            if (isSensorAvailable) {
                generateKey();

                if (cipherInit()) {
                    //Create dialog
                    FingerprintAuthenticationDialogFragment fragment = new FingerprintAuthenticationDialogFragment(TouchManager.this);
                    //Assign crypto Object
                    fragment.setCryptoObject(new FingerprintManagerCompat.CryptoObject(defaultCipher));
                    //Start Authentication
                    fragment.show(activityContext.getFragmentManager(), DIALOG_FRAGMENT_TAG);
                }
            } else {
                authenticationStatus.invoke("UNAVAILABLE");
            }
        }
    }

    public void authenticationSuccess(String successMessage) {
        authenticationCallback.invoke(successMessage);
    }

    public void authenticationFailed(String errorMessage) {
        authenticationCallback.invoke(errorMessage);
    }

    @TargetApi(Build.VERSION_CODES.M)
    private void generateKey() {
        try {
            mKeyStore = KeyStore.getInstance("AndroidKeyStore");
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            mKeyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
        } catch (NoSuchAlgorithmException | NoSuchProviderException e) {
            throw new RuntimeException("Failed to get KeyGenerator instance", e);
        }

        try {
            mKeyStore.load(null);
            mKeyGenerator.init(new
                    KeyGenParameterSpec.Builder(DEFAULT_KEY_NAME,
                    KeyProperties.PURPOSE_ENCRYPT |
                            KeyProperties.PURPOSE_DECRYPT)
                    .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
                    .setUserAuthenticationRequired(true)
                    .setEncryptionPaddings(
                            KeyProperties.ENCRYPTION_PADDING_PKCS7)
                    .build());
            mKeyGenerator.generateKey();
        } catch (NoSuchAlgorithmException | InvalidAlgorithmParameterException | CertificateException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    @TargetApi(Build.VERSION_CODES.M)
    private boolean cipherInit() {
        //Get Cipher
        try {
            defaultCipher = Cipher.getInstance(KeyProperties.KEY_ALGORITHM_AES + "/" +
                    KeyProperties.BLOCK_MODE_CBC + "/" +
                    KeyProperties.ENCRYPTION_PADDING_PKCS7);
        } catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
            throw new RuntimeException("Failed to get Cipher", e);
        }
        //Get key and pass it to cipher
        try {
            mKeyStore.load(null);
            SecretKey key = (SecretKey) mKeyStore.getKey(DEFAULT_KEY_NAME,
                    null);
            defaultCipher.init(Cipher.ENCRYPT_MODE, key);
            return true;
        } catch (KeyPermanentlyInvalidatedException e) {
            return false;
        } catch (KeyStoreException | CertificateException | UnrecoverableKeyException | IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Failed to init Cipher", e);
        }
    }

    private boolean checkFingerSensor() {
        Context reactContext = getReactApplicationContext();
        FingerprintManagerCompat fingerprintManager = FingerprintManagerCompat.from(reactContext);
        KeyguardManager keyguardManager = (KeyguardManager) reactContext.getSystemService(Context.KEYGUARD_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.USE_FINGERPRINT) == PackageManager.PERMISSION_GRANTED && fingerprintManager.isHardwareDetected() && fingerprintManager.hasEnrolledFingerprints() && keyguardManager.isKeyguardSecure();
        } else {
            return fingerprintManager.isHardwareDetected() && fingerprintManager.hasEnrolledFingerprints() && keyguardManager.isKeyguardSecure();
        }
    }

    private void writeToFile(String data) {
        Context reactContext = getReactApplicationContext();
        try {
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(reactContext.openFileOutput("config.txt", Context.MODE_PRIVATE));
            outputStreamWriter.write(data);
            outputStreamWriter.close();
        } catch (IOException e) {
            Log.e("Exception", "File write failed: " + e.toString());
        }
    }

    private String readFromFile() {
        String encryptedJSONFromFile = "{}";
        Context reactContext = getReactApplicationContext();

        try {
            InputStream inputStream = reactContext.openFileInput("config.txt");

            if (inputStream != null) {
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                String receiveString = "";
                StringBuilder stringBuilder = new StringBuilder();

                while ((receiveString = bufferedReader.readLine()) != null) {
                    stringBuilder.append(receiveString);
                }

                inputStream.close();
                encryptedJSONFromFile = stringBuilder.toString();
            }
        } catch (FileNotFoundException e) {
            Log.e(TAG, "File not found: " + e.toString());
            e.printStackTrace();
        } catch (IOException e) {
            Log.e(TAG, "Can not read file: " + e.toString());
            e.printStackTrace();
        }

        Log.e(TAG, "readFileSystem : " + encryptedJSONFromFile);

        return encryptedJSONFromFile;
    }

    private String decryptText(String encryptedText) {

        byte[] inputEncryptedJSONFromFile = Base64.decode(encryptedText, Base64.DEFAULT);
        String decryptedJSON = null;
        Context reactContext = getReactApplicationContext();

        try {
            DecryptUtil decryptUtil = new DecryptUtil();

            try {
                decryptedJSON = decryptUtil.decrypt(SAMPLE_ALIAS, inputEncryptedJSONFromFile, reactContext/*, encryptor.getIv()*/);
            } catch (UnrecoverableEntryException | NoSuchAlgorithmException | KeyStoreException | NoSuchPaddingException | NoSuchProviderException | IOException | InvalidKeyException e) {
                Log.e(TAG, "Error DecryptData : " + e.getMessage(), e);
            } catch (IllegalBlockSizeException | BadPaddingException | InvalidAlgorithmParameterException e) {
                Log.e(TAG, "Error DecryptData : " + e.getMessage(), e);
                e.printStackTrace();
            }

        } catch (CertificateException | NoSuchAlgorithmException | KeyStoreException | IOException e) {
            e.printStackTrace();
        }

        return decryptedJSON;
    }

    private String encryptText(String inputJSON) {
        String encryptedJSON = null;
        Context reactContext = getReactApplicationContext();
        EncryptUtil encryptUtil = new EncryptUtil();

        try {
            final byte[] encryptedText = encryptUtil.encrypt(SAMPLE_ALIAS, inputJSON, reactContext);
            encryptedJSON = Base64.encodeToString(encryptedText, Base64.DEFAULT);
        } catch (UnrecoverableEntryException | NoSuchAlgorithmException | NoSuchProviderException |
                KeyStoreException | IOException | NoSuchPaddingException | InvalidKeyException e) {
            Log.e(TAG, "Error EncryptData : " + e.getMessage(), e);
        } catch (InvalidAlgorithmParameterException | SignatureException | IllegalBlockSizeException | BadPaddingException e) {
            e.printStackTrace();
            Log.e(TAG, "Error EncryptData : " + e.getMessage(), e);
        }
        return encryptedJSON;
    }
}
