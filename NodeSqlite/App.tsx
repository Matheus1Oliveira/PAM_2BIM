import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { conexao, createTable } from './conf/banco';
import { useEffect } from 'react';
import * as SQLite from "expo-sqlite";
import * as React from 'react';
import { Button } from 'react-native-paper';

export default function App() {

  // HOOK
  useEffect(() => {
    async function main() {
        const db = await conexao();
    }
    main();
  }, []);

  

  return (
    <View style={styles.container}>
     <Button icon="camera" mode="contained" onPress={() => createTable()}>
    Press me
  </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
