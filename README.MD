# Neighborhood Lookup Tool - Expo React Native Web App
# version 1.0.0-beta.1
# For questions, please contact matt0164@outlook.com

To start app:

# 1.	Navigate to directory that contains source code, e.g.:
        Cd "C:\Users\matta\OneDrive\Matt0164 Documents\OneDrive\Documents\00 Matt\Coding\NeighborhoodExpoApp\"

# 2.    Open a new terminal window and run the custom server script using Node.js:
        node custom-server.js

# 3.	Open a new terminal (node) window and launch expo
        npx expo start 
        
# Note: expo V17 node js - expo start will not work with this new expo CLI

# Key dependencies
        npm install
#        Note: will install all dependencies if in project root directory when run

#        {
#            "name": "mspneighborhoods",
#            "version": "1.0.0-beta.1",
#            "main": "node_modules/expo/AppEntry.js",
#            "scripts": {
#                "start": "expo start",
#                "android": "expo start --android",
#                "ios": "expo start --ios",
#                "web": "expo start --web"
#            },
#            "dependencies": {
#                "@expo/webpack-config": "^19.0.0",
#                "expo": "~49.0.8",
#                "expo-status-bar": "~1.6.0",
#                "finalhandler": "^1.2.0",
#                "fuse": "^0.4.0",
#                "fuse.js": "6.6.2",
#                "react": "18.2.0",
#                "react-native": "0.72.5",
#                "react-native-web": "~0.19.6",
#                "serve-static": "^1.15.0"
#            },
#            "devDependencies": {
#                "@babel/core": "^7.20.0"
#            },
#            "private": true
#        }


To get app on app store using EAS

1.	Get accounts on developer.apple.com and expo.dev
2.	Install EAS: npm install -g eas-cli
3.	Login: eas login
4.	Configure: eas build:configure
5.	Build: eas build --platform ios [replace ios if necessary]

Note: backend database and image rendering will need to be modified before ios app deployment possible