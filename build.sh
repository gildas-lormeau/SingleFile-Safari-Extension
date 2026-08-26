#!/usr/bin/env bash

cd ./single-file
npx rollup -c rollup.config.js
cd ..

rm -rf ./Shared\ \(Extension\)/Resources/*
cp -R ./single-file/_locales ./Shared\ \(Extension\)/Resources
cp -R ./single-file/lib ./Shared\ \(Extension\)/Resources
cp -R ./single-file/src ./Shared\ \(Extension\)/Resources
cp ./single-file/manifest.json ./Shared\ \(Extension\)/Resources/

# The committed resources must stay keyless, the Woleet API key is injected
# into the built app by the "Inject Woleet API Key" Xcode build phase
if ! grep -q "WOLEET_API_KEY_PLACEHOLDER" ./Shared\ \(Extension\)/Resources/src/lib/woleet/woleet.js ||
    grep -q "eyJhbGciOiJIUzI1NiJ9" ./Shared\ \(Extension\)/Resources/src/lib/woleet/woleet.js ./Shared\ \(Extension\)/Resources/lib/single-file-extension-background.js; then
    echo "The Woleet API key placeholder is missing or a real key was copied into the resources"
    exit 1
fi

jq "del(.optional_permissions,.incognito,.permissions[0],.permissions[2])" ./Shared\ \(Extension\)/Resources/manifest.json > ./Shared\ \(Extension\)/Resources/manifest.tmp.json
sed -i "" 's/menus/contextMenus/g' ./Shared\ \(Extension\)/Resources/manifest.tmp.json
sed -i "" 's/background.html"/background.html", "persistent": false/g' ./Shared\ \(Extension\)/Resources/manifest.tmp.json
mv ./Shared\ \(Extension\)/Resources/manifest.tmp.json ./Shared\ \(Extension\)/Resources/manifest.json
