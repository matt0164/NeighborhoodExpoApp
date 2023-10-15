//App.js - main Expo app file
//imports a bunch of moduules and then displays a button and a text input
//the button downloads a PDF from the web and opens it in a PDF viewer
//the text input is used to search a JSON file for a neighborhood name
//the JSON file is downloaded from a Firebase database
//the JSON file is searched using Fuse.js
//Fuse.js is a fuzzy search library
//the JSON file is a list of names and neighborhoods
//the image in the background is randomly selected from an array of images

import React, { useEffect } from 'react';
import { View, Text, Pressable, Linking, ImageBackground, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import NeighborhoodLookup from '../components/NeighborhoodLookup';
import { getRandomBackgroundImage } from '../components/image_array';
import { initializeApp } from 'firebase/app';

import { app } from './firebase/firebaseConfig'; // Import the Firebase app

const firebaseConfig = {
  apiKey: "AIzaSyD7i1BncW-ZG1CVVBaJNweBCqw_prKJB5c",
  authDomain: "msp-neighborhood.firebaseapp.com",
  databaseURL: "https://msp-neighborhood-default-rtdb.firebaseio.com",
  projectId: "msp-neighborhood",
  storageBucket: "msp-neighborhood.appspot.com",
  messagingSenderId: "292117513070",
  appId: "1:292117513070:web:a79c18144168a0678af77f",
  measurementId: "G-F9FTXM2CMS"
};

initializeApp(firebaseConfig);

export default function App() {
  useEffect(() => {
    // Download any initial data or perform other setup here
  }, []);

  const downloadPDF = async () => {
    // Download the PDF from the web and use Linking to open it in a PDF viewer.
    const pdfShareLink = 'https://1drv.ms/b/s!AlYNfSmM3j0Dneorgk4OOcvlQYbyow?e=vDGv7e';
    Linking.openURL(pdfShareLink);
  };

  // Generate a random background image
  const selectedBackgroundImage = getRandomBackgroundImage();

  return (
    <ImageBackground
      source={{ uri: selectedBackgroundImage }}
      style={styles.container}
    >
      <View>
        <Text style={styles.header}>Neighborhood Lookup</Text>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? 'darkblue' : 'blue',
            },
          ]}
          onPress={downloadPDF}
        >
          <Text style={styles.buttonText}>Download PDF</Text>
        </Pressable>
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
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
  },
});
