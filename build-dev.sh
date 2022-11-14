#!/bin/sh

cd ./single-file
npx rollup -c rollup.config.dev.js
cd ..

rm -rf ./Shared\ \(Extension\)/Resources/*
cp -R ./single-file/_locales ./Shared\ \(Extension\)/Resources
cp -R ./single-file/lib ./Shared\ \(Extension\)/Resources
cp -R ./single-file/src ./Shared\ \(Extension\)/Resources
cp ./single-file/manifest.json ./Shared\ \(Extension\)/Resources/
