import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { database } from '../firebase/database';

import Fuse from 'fuse.js';

function NeighborhoodLookup() {
  const [neighborhoodData, setNeighborhoodData] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function readNeighborhoodData() {
      try {
        const snapshot = await database.ref('neighborhoods').get();
        const neighborhoodData = snapshot.val();

        if (neighborhoodData) {
          setNeighborhoodData(neighborhoodData);
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

  const options = {
    includeScore: true,
    keys: ['name'],
    threshold: 0.3,
  };

  const lookupNeighborhood = () => {
    if (neighborhoodData) {
      const fuse = new Fuse(neighborhoodData, options);
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

  if (loading) {
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
            <Pressable
              style={styles.button}
              onPress={lookupNeighborhood}
            >
              <Text>Find Neighborhood</Text>
            </Pressable>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.result}>{result}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default NeighborhoodLookup;