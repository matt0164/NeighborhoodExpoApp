# Neighborhood Lookup Tool - Expo React Native Web App
version 1.0.0-beta.1
eas-build2 branch is to test building web version in eas

### this project lives on github here:
        https://github.com/matt0164/NeighborhoodExpoApp.git
        git@github.com:matt0164/NeighborhoodExpoApp.git
        gh repo clone matt0164/NeighborhoodExpoApp

## For questions, please contact matt0164@outlook.com

## The app has been deployed using netlify
Website URL:       https://neighborhoodlookuptool.netlify.app

Build logs:        https://app.netlify.com/sites/neighborhoodlookuptool/deploys/6537882552389c0504b3992f
Function logs:     https://app.netlify.com/sites/neighborhoodlookuptool/functions
Unique deploy URL: https://6537882552389c0504b3992f--neighborhoodlookuptool.netlify.app


# To start app and test locally:

### 1.	Navigate to directory that contains source code, e.g.:
        Cd "C:\Users\matta\OneDrive\Matt0164 Documents\OneDrive\Documents\00 Matt\Coding\NeighborhoodExpoApp\"
                [or]
        Cd "C:\NeighborhoodExpoApp\"

#### to clone:
        git clone -b [insert branch] https://github.com/matt0164/NeighborhoodExpoApp.git

### 3.  Install all dependencies*
        npm install

### 3.    Open a new terminal window and run the custom server script using Node.js:
        node custom-server.js

### 4.	Open a new terminal (node) window and launch expo
        npx expo start
                [or]
        npx expo start --web
#### Note: expo V17 node js - expo start will not work with this new expo CLI

### 5.  To deploy to EAS servers:
###     Creating a build of the project is the first step to publishing a web app. Whether you want to serve it locally or host it on a third-party service, you'll need to export all JavaScript and assets of a project. This is known as a static bundle. It can be exported by running the following command:
        npx expo export:web 

### 6.  Use Serve CLI to quickly test locally how your website will be hosted in production. Run the following command to serve the static bundle:
        npx serve web-build --single        

### 7. Open http://localhost:3000 to see your project in action. This method is HTTP only, so permissions, camera, location, and many other things won't work.
        Open http://localhost:3000

### 8. Hosting on third-party services
        https://docs.expo.dev/distribution/publishing-websites/#hosting-on-third-party-services

###     Netlify is a platform for deploying web apps. This has the highest
###     compatibility with Expo web apps as it makes few assumptions about the framework.

###     8a.     Install the Netlify CLI by running the following command:

                npm install -g netlify-cli

###     8b. (if required) Configure redirects for single-page applications.
###             If your app implements any navigation, you'll need to configure Netlify to redirect 
###             requests to the single web-build/index.html file. This can be done in Netlify by 
###             creating a ./public/_redirects file and redirecting all requests to /index.html.

###     Navigate inside the web-build directory and run the following command to create 
###             _redirects file with follwing rule:

                /*    /index.html   200

###     8c. Deploy the web build folder by running the following command:

                netlify deploy --dir web-build
###         If everything looks good, deploy to production
                netlify deploy --prod

## *Key dependencies:
        
####        Note: npm install will install all dependencies if in project root directory when run

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


# To publish  app on app store using EAS

1.	Get accounts on developer.apple.com and expo.dev
2.	Install EAS: npm install -g eas-cli
3.	Login: eas login
4.	Configure: eas build:configure
5.	Build: eas build --platform ios [replace ios if necessary]
6.      build:view       view a build for your project

Note: backend database and image rendering will need to be modified before ios app deployment possible. Recommend implementing firebase or SQLite before ios build