package com.bcbsfl.mobile.android;

import android.annotation.TargetApi;
import android.os.Build;
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;
import android.widget.ImageView;
import android.widget.TextView;

import static android.hardware.fingerprint.FingerprintManager.FINGERPRINT_ERROR_LOCKOUT;

/**
 * Created by g6ep on 8/3/17.
 */

@TargetApi(Build.VERSION_CODES.M)
public class FingerprintUiHelper extends FingerprintManagerCompat.AuthenticationCallback {

    private static final long SUCCESS_DELAY_MILLIS = 1300;
    private final FingerprintManagerCompat mFingerprintManager;
    private final ImageView mIcon;
    private final TextView mErrorTextView;
    private final Callback mCallback;
    private android.support.v4.os.CancellationSignal mCancellationSignal;
    private boolean mSelfCancelled;

    private Runnable mResetErrorTextRunnable = new Runnable() {
        @Override
        public void run() {
            mErrorTextView.setTextColor(mErrorTextView.getResources().getColor(R.color.hint_color, null));
            mErrorTextView.setText(mErrorTextView.getResources().getString(R.string.fingerprint_hint));
            mIcon.setImageResource(R.drawable.ic_fp_40px);
        }
    };

    FingerprintUiHelper(FingerprintManagerCompat fingerprintManager, ImageView icon, TextView errorTextView, Callback callback) {
        mFingerprintManager = fingerprintManager;
        mIcon = icon;
        mErrorTextView = errorTextView;
        mCallback = callback;
    }

    public void startListening(FingerprintManagerCompat.CryptoObject cryptoObject) {
        if (!isFingerprintAuthAvailable()) {
            return;
        }
        mCancellationSignal = new android.support.v4.os.CancellationSignal();
        mSelfCancelled = false;
        // The line below prevents the false positive inspection from Android Studio
        // noinspection ResourceType
        mFingerprintManager.authenticate(cryptoObject,  0 /* flags */,mCancellationSignal, this, null);
        mIcon.setImageResource(R.drawable.ic_fp_40px);
    }

    @Override
    public void onAuthenticationSucceeded(FingerprintManagerCompat.AuthenticationResult result) {
        mErrorTextView.removeCallbacks(mResetErrorTextRunnable);
        mIcon.setImageResource(R.drawable.ic_fingerprint_success);
        mErrorTextView.setTextColor(mErrorTextView.getResources().getColor(R.color.success_color, null));
        mErrorTextView.setText(mErrorTextView.getResources().getString(R.string.fingerprint_success));
        mIcon.postDelayed(new Runnable() {
            @Override
            public void run() {
                mCallback.onAuthenticationSuccess();
            }
        }, SUCCESS_DELAY_MILLIS);
    }

    @Override
    public void onAuthenticationError(int errMsgId, final CharSequence errString) {
        if (!mSelfCancelled) {
            if (errMsgId == FINGERPRINT_ERROR_LOCKOUT) {
                PreferenceHelper.getPrefernceHelperInstace().setBoolean(mIcon.getContext(), "LOCK_FINGERPRINT", false);
                mCallback.onAuthenticationError("LOCKED");
            } else {
                mCallback.onAuthenticationError("USER CANCEL");
            }
        }
    }

    @Override
    public void onAuthenticationHelp(int helpMsgId, final CharSequence helpString) {
        mCallback.onAuthenticationError("UNKNOWN");
    }

    @Override
    public void onAuthenticationFailed() {
        mCallback.onAuthenticationError("AUTH FAILED");
    }

    public void stopListening() {
        if (mCancellationSignal != null) {
            mSelfCancelled = true;
            mCancellationSignal.cancel();
            mCancellationSignal = null;
        }
    }

    public boolean isFingerprintAuthAvailable() {
        // The line below prevents the false positive inspection from Android Studio
        // noinspection ResourceType
        return mFingerprintManager.isHardwareDetected() && mFingerprintManager.hasEnrolledFingerprints();
    }

    public interface Callback {
        void onAuthenticationSuccess();
        void onAuthenticationError(String errorMessage);
    }
}
