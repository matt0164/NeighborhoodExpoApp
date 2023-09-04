import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Linking, StyleSheet, Pressable } from 'react-native';
import { Asset } from 'expo-asset'; // Import the Asset module
import * as XLSX from 'xlsx';
import Fuse from 'fuse.js';

function NeighborhoodLookup() {
  const [neighborhoodData, setNeighborhoodData] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    async function readExcel() {
      try {
      // Load the Excel file using Asset.fromModule
      const neighborhoodExcel = Asset.fromModule(require('./neighborhoods.xlsx'));
      await neighborhoodExcel.downloadAsync();
      const localUri = neighborhoodExcel.localUri;

      // Use localUri to read the Excel file
      const response = await fetch(localUri);
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });

      // Process the Excel data here
      const worksheet = workbook.Sheets['Sheet1'];
      const dataJson = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      setNeighborhoodData(dataJson);
    } catch (error) {
    console.error('Error reading Excel file:', error);
   }
  }

    readExcel();
  }, []);

  const options = {
    includeScore: true,
    keys: ['name'],
    threshold: 0.3,
  };

  let fuse;

  const lookupNeighborhood = () => {
    if (neighborhoodData) {
      fuse = new Fuse(neighborhoodData, options);
      const results = fuse.search(nameInput);

      if (results.length > 0) {
        const match = results[0].item;
        setResult(`${match.name}: Your neighborhood is ${match.neighborhood}`);
      } else {
        setResult('Name not found in the neighborhood table.');
      }
    } else {
      setResult('Neighborhood data file not found.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Neighborhood Lookup</Text>
      <View style={styles.backgroundContainer}>
        <View style={styles.searchContainer}>
        <Text style={styles.inputLabel}>Enter your name:</Text>
          <Text> </Text>
          <TextInput
            style={styles.input}
            value={nameInput}
            onChangeText={(text) => setNameInput(text)}
          />
          <Pressable 
          style = {styles.button}
          onPress={lookupNeighborhood}
          >
          <Text style={styles.buttonText}>Find Neighborhood</Text>
          </Pressable>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{result}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  backgroundContainer: {
    marginTop: 30,
    backgroundColor: 'lightgray', // Add this line to set the background color
    alignItems: 'center',
    borderRadius: 10, // Add this line to round the corners
    padding: 20, // Add more padding to the container
  },
  searchContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20, // Add horizontal padding to the search container
  },
  inputLabel: {
    fontSize: 18, // Adjust the font size as needed
    color: 'black', // You can adjust the color as well
  },  
  input: {
    width: 200,
    height: 40,
    borderWidth: 2,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10, // Add horizontal padding to the input field
    borderRadius: 5, // Optionally, add rounded corners to the input field
  },
  resultContainer: {
    alignItems: 'center',
    backgroundColor: 'lightgray', // Add this line to set the background color
    padding: 20, // You can adjust the padding as needed
    borderRadius: 10, // You can add rounded corners if desired
  },
  button: {
      backgroundColor: 'aliceblue', // Adjust the button background color
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5, // Optionally, add rounded corners to the button
    },

    buttonText: {
      color: 'black', // Adjust the button text color
      fontSize: 16,
    },
    result: {
      fontSize: 18, // Adjust the font size as needed
      color: 'black', // You can adjust the color as well
    },
    
  });
  

export default NeighborhoodLookup;
