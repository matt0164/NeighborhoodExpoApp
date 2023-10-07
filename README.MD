# For questions, please contact matt0164@outlook.com

To start app:
1.	Navigate to directory that contains source code, e.g.:
Cd "C:\Users\matta\OneDrive\Matt0164 Documents\OneDrive\Documents\00 Matt\Coding\NeighborhoodExpoApp\"
2.	npx expo start (not expo start with new expo CLI)

To get app on app store using EAS

1.	Get accounts on developer.apple.com and expo.dev
2.	Install EAS: npm install -g eas-cli
3.	Login: eas login
4.	Configure: eas build:configure
5.	Build: eas build --platform ios [replace ios if necessary]
