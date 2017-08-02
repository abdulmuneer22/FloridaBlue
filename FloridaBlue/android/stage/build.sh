#!/bin/bash
echo "Start Android Stage Build"
export ENVFILE=.env.stage
cp android/stage/google-services.json android/app/google-services.json
cd android
./gradlew clean
./gradlew --stop
./gradlew assembleRelease
