#!/usr/bin/env bash

cd ./single-file
npx rollup -c rollup.config.js
cd ..

rm -rf ./Shared\ \(Extension\)/Resources/*
cp -R ./single-file/_locales ./Shared\ \(Extension\)/Resources
cp -R ./single-file/lib ./Shared\ \(Extension\)/Resources
cp -R ./single-file/src ./Shared\ \(Extension\)/Resources
cp ./single-file/manifest.json ./Shared\ \(Extension\)/Resources/

jq "del(.optional_permissions,.incognito,.permissions[0],.permissions[2])" ./Shared\ \(Extension\)/Resources/manifest.json > ./Shared\ \(Extension\)/Resources/manifest.tmp.json
sed -i "" 's/menus/contextMenus/g' ./Shared\ \(Extension\)/Resources/manifest.tmp.json
sed -i "" 's/background.html"/background.html", "persistent": false/g' ./Shared\ \(Extension\)/Resources/manifest.tmp.json
mv ./Shared\ \(Extension\)/Resources/manifest.tmp.json ./Shared\ \(Extension\)/Resources/manifest.json
