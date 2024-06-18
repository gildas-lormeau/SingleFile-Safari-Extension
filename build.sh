#!/usr/bin/env bash

cd ./single-file
npx rollup -c rollup.config.js
cd ..

rm -rf ./Shared\ \(Extension\)/Resources/*
cp -R ./single-file/_locales ./Shared\ \(Extension\)/Resources
cp -R ./single-file/lib ./Shared\ \(Extension\)/Resources
cp -R ./single-file/src ./Shared\ \(Extension\)/Resources
cp ./single-file/manifest.json ./Shared\ \(Extension\)/Resources/

jq "del(.options_page,.sidebar_action,.oauth2,.browser_specific_settings,.optional_permissions,.incognito)" ./Shared\ \(Extension\)/Resources/manifest.json > ./Shared\ \(Extension\)/Resources/manifest.tmp.json
mv ./Shared\ \(Extension\)/Resources/manifest.tmp.json ./Shared\ \(Extension\)/Resources/manifest.json
jq "del(.permissions[0],.permissions[1],.permissions[3])" ./Shared\ \(Extension\)/Resources/manifest.json > ./Shared\ \(Extension\)/Resources/manifest.tmp.json
mv ./Shared\ \(Extension\)/Resources/manifest.tmp.json ./Shared\ \(Extension\)/Resources/manifest.json
