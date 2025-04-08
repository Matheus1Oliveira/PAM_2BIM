import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Banco from "./components/banco";

export default function App() {
  return (
    <View style={styles.container}>
      <Banco />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
