//App.js - main Expo app file
//imports a bunch of moduules and then displays a button and a text input
//the button downloads a PDF from the web and opens it in a PDF viewer
//the text input is used to search a JSON file for a neighborhood name
//the JSON file is downloaded from a Firebase database
//the JSON file is searched using Fuse.js
//Fuse.js is a fuzzy search library
//the JSON file is a list of names and neighborhoods
//the image in the background is randomly selected from an array of images

import React from 'react';
import { View, Text, Button, Linking, ImageBackground, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import NeighborhoodLookup from './components/NeighborhoodLookup';
import { getRandomBackgroundImage } from './components/image_array';

export default function App() {
  const downloadPDF = async () => {

    // Download the PDF from the web and use linking to OneDrive to open it in a PDF viewer.
    const pdfShareLink = 'https://1drv.ms/b/s!AlYNfSmM3j0Dneorgk4OOcvlQYbyow?e=vDGv7e';
    Linking.openURL(pdfShareLink);

    //<<UNCOMMENT THE NEXT 6 LINES IF YOU WANT TO USE THE LOCAL FILE>>
    //const pdfAsset = Asset.fromModule(require('./assets/neighborhoods.pdf')); <<UNCOMMENT THIS LINE IF YOU WANT TO USE THE LOCAL FILE
    //await pdfAsset.downloadAsync(); <<UNCOMMENT THIS LINE IF YOU WANT TO USE THE LOCAL FILE
    //const localUri = pdfAsset.localUri; <<UNCOMMENT THIS LINE IF YOU WANT TO USE THE LOCAL FILE
    
    // Use localUri to open or display the downloaded PDF.
    // You can use Linking to open it in a PDF viewer.
    //Linking.openURL(localUri); <<UNCOMMENT THIS LINE IF YOU WANT TO USE THE LOCAL FILE
  };

  // Generate a random background image
  const selectedBackgroundImage = getRandomBackgroundImage();

  return (
    <ImageBackground
      source={{ uri: selectedBackgroundImage }}
      style={styles.container}
    >
      <View>
        <Text>Neighborhood Lookup</Text>
        <Button title="Download PDF" onPress={downloadPDF} />
      </View>
      <NeighborhoodLookup />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // You can add other styles like padding, margins, etc. here
  },
});
