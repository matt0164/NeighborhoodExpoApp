import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Fuse from 'fuse.js';
import database from '../database.json';

function NeighborhoodLookup() {
  const [nameInput, setNameInput] = useState('');
  const [result, setResult] = useState('');

  const neighborhoodList = useMemo(() => Object.values(database), []);

  const fuse = useMemo(
    () =>
      new Fuse(neighborhoodList, {
        includeScore: true,
        keys: ['name'],
        threshold: 0.3,
      }),
    [neighborhoodList],
  );

  const lookupNeighborhood = () => {
    const results = fuse.search(nameInput.trim());

    if (results.length > 0) {
      const match = results[0].item;
      setResult(`${match.name}: Your neighborhood is ${match.neighborhood}`);
    } else {
      setResult('Name not found in the neighborhood table.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Neighborhood Lookup</Text>
      <TextInput
        style={styles.input}
        value={nameInput}
        onChangeText={setNameInput}
        autoCorrect={false}
        autoCapitalize="words"
        accessibilityLabel="Name to look up"
      />
      <Pressable style={styles.button} onPress={lookupNeighborhood}>
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
