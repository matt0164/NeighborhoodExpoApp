import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from '../firebase/firebase';
import Fuse from 'fuse.js'; // Import Fuse.js

const database = firebase.database();

function NeighborhoodLookup() {
  const [neighborhoodData, setNeighborhoodData] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    async function readNeighborhoodData() {
      const neighborhoodRef = database.ref('neighborhoods');
      const snapshot = await neighborhoodRef.get();
      const neighborhoodData = snapshot.val();

      setNeighborhoodData(neighborhoodData);
    }

    readNeighborhoodData();
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
          <TextInput
            style={styles.input}
            value={nameInput}
            onChangeText={(text) => setNameInput(text)}
          />
          <Button
            title="Find Neighborhood"
            onPress={lookupNeighborhood}
          />
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
    backgroundColor: 'lightgray',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  searchContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 18,
    color: 'black',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 2,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resultContainer: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 20,
    borderRadius: 10,
  },
  result: {
    fontSize: 18,
    color: 'black',
  },

});

export default NeighborhoodLookup;