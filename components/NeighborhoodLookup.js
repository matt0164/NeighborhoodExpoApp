import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Fuse from 'fuse.js'; // Import Fuse.js

function NeighborhoodLookup() {
  const [neighborhoodData, setNeighborhoodData] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function readNeighborhoodData() {
      try {
        //Fetch the JSON data from your local http server during testing
        //const response = await fetch('http://localhost:8080/public/database.json')
        
        // Fetch the JSON data from your Netlify server during production
        const response = await fetch('https://neighborhoodlookuptool.netlify.app/database.json');
        const data = await response.json();

        if (data) {
          setNeighborhoodData(data);
          setLoading(false);
        } else {
          console.error('Neighborhood data not found.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching neighborhood data:', error);
        setLoading(false);
      }
    }

    readNeighborhoodData();
  }, []);

  const lookupNeighborhood = () => {
    if (neighborhoodData) {
      const options = {
        includeScore: true,
        keys: ['name'],
        threshold: 0.3,
      };

      // Create a Fuse instance
      const fuse = new Fuse(Object.values(neighborhoodData), options);

      // Search for a neighborhood
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
      <TextInput
        style={styles.input}
        value={nameInput}
        onChangeText={(text) => setNameInput(text)}
      />
      <Pressable
        style={styles.button}
        onPress={lookupNeighborhood}
      >
        <Text style={styles.buttonText}>Find Neighborhood</Text>
      </Pressable>
      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
  },
  result: {
    marginTop: 10,
    color: 'blue',
  },
});

export default NeighborhoodLookup;