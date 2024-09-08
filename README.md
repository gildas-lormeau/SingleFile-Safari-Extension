# SingleFile for Safari

This reposirory contains the source code of SingleFile for Safari.

The extension can be downloaded from the App Store: https://apps.apple.com/us/app/singlefile-for-safari/id6444322545

# Installation

1. Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
2. Clone or download the Xcode project as a [zip file](https://github.com/gildas-lormeau/SingleFile-Safari-Extension/archive/refs/heads/main.zip) and unzip it somewhere on your machine
3. Launch Xcode and open the folder where you cloned/unzipped the Xcode project
4. Press the Play button in the title bar of the left panel in Xcode to build the app and install the extension in Safari
5. Allow Safari to run unsigned extensions by following this procedure: https://developer.apple.com/documentation/safariservices/building-a-safari-app-extension#Enable-your-app-extension-in-Safari

# Build

1. Run `./init.sh` to retrieve the source code of the extension from GitHub
2. Run `./build-dev.sh` (development) or `./build.sh` (production) to build the extension
3. Build the project in Xcode

Note: When building for development, the script expects the `single-file` folder to be a sibling of the `SingleFile-Safari` folder.
