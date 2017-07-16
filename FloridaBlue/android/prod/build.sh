#!/bin/bash
echo "Start Android Prod Build"
export ENVFILE=.env.prod
cp android/prod/google-services.json android/app/google-services.json
cd android
./gradlew assembleRelease