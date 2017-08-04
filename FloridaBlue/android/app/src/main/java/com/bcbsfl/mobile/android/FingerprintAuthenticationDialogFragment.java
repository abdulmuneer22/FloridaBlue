package com.bcbsfl.mobile.android;

import android.app.DialogFragment;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

/**
 * Created by g6ep on 8/3/17.
 */

public class FingerprintAuthenticationDialogFragment extends DialogFragment implements FingerprintUiHelper.Callback {

    private FingerprintManagerCompat.CryptoObject mCryptoObject;
    private FingerprintUiHelper mFingerprintUiHelper;
    private MainActivity mActivity;
    private SharedPreferences mSharedPreferences;
    private TouchManager touchManager;

    public FingerprintAuthenticationDialogFragment(TouchManager touchManager) {
        this.touchManager = touchManager;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Do not create a new Fragment when the Activity is re-created such as orientation changes.
        setRetainInstance(true);
        setStyle(DialogFragment.STYLE_NORMAL, android.R.style.Theme_Material_Light_Dialog);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        getDialog().setTitle(getString(R.string.sign_in));
        View rootView = inflater.inflate(R.layout.fingerprint_dialog_container, container, false);
        rootView.findViewById(R.id.cancel_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dismiss();
            }
        });

        rootView.findViewById(R.id.cancel_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dismiss();
            }
        });

        mFingerprintUiHelper = new FingerprintUiHelper(
                FingerprintManagerCompat.from(mActivity),
                (ImageView) rootView.findViewById(R.id.fingerprint_icon),
                (TextView) rootView.findViewById(R.id.fingerprint_status), this);

        // If fingerprint authentication is not available, switch immediately to the backup
        if (!mFingerprintUiHelper.isFingerprintAuthAvailable()) {
            touchManager.authenticationFailed("UNAVAILABLE");
            dismiss();
        }
        return rootView;
    }

    /**
     * Sets the crypto object to be passed in when authenticating with fingerprint.
     */
    public void setCryptoObject(FingerprintManagerCompat.CryptoObject cryptoObject) {
        mCryptoObject = cryptoObject;
    }

    @Override
    public void onAuthenticationSuccess() {
        //  authentication was successful.
        touchManager.authenticationSuccess("AUTHENTICATED");
        dismiss();
    }

    @Override
    public void onAuthenticationError(String errorMessage) {
        touchManager.authenticationFailed(errorMessage);
        dismiss();
    }

    @Override
    public void onResume() {
        super.onResume();
        mFingerprintUiHelper.startListening(mCryptoObject);
    }

    @Override
    public void onPause() {
        super.onPause();
        mFingerprintUiHelper.stopListening();
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        mActivity = (MainActivity) getActivity();
        mSharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
    }
}
