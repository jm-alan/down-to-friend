import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';

export default function App () {
  const [popped, setPopped] = useState(false);
  const togglePopped = () => setPopped(previousPopped => !previousPopped);

  return (
    <SafeAreaView style={styles.container}>
      {popped
        ? (
          <Text
            style={styles.displayText}
          >
            This text is now displayed!
          </Text>
          )
        : null}
      <TouchableOpacity
        onPress={togglePopped}
        style={styles.button}
      >
        <Text
          style={styles.buttonText}
        >
          This is a fake button!
        </Text>
      </TouchableOpacity>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgrey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 50,
    color: 'orange'
  },
  displayText: {
    color: 'green',
    fontSize: 50,
    textAlign: 'center'
  }
});
