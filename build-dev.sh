#!/bin/sh

cd ./single-file
npx rollup -c rollup.config.dev.js
cd ..

rm -rf ./SingleFile\ Safari\ Extension/Resources/*
cp -R ./single-file/_locales ./SingleFile\ Safari\ Extension/Resources
cp -R ./single-file/lib ./SingleFile\ Safari\ Extension/Resources
cp -R ./single-file/src ./SingleFile\ Safari\ Extension/Resources
cp ./single-file/manifest.json ./SingleFile\ Safari\ Extension/Resources/
