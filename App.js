import React from 'react';
import { View, Text, Button, Linking, ImageBackground, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import NeighborhoodLookup from './components/NeighborhoodLookup';
import { getRandomBackgroundImage } from './components/image_array';

export default function App() {
  const downloadPDF = async () => {
    const pdfAsset = Asset.fromModule(require('./assets/neighborhoods.pdf'));
    await pdfAsset.downloadAsync();
    const localUri = pdfAsset.localUri;
    // Use localUri to open or display the downloaded PDF.
    // You can use Linking to open it in a PDF viewer.
    Linking.openURL(localUri);
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
    // You can add other styles like padding, margins, etc. here
  },
});
