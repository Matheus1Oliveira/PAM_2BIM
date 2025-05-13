import React, { useState } from "react";
import { TextInput, Button, Alert, View, Text } from "react-native";
import { db } from "../database/db";

type Props = {
  onRefresh: () => void;
};

const InserirUsuario: React.FC<Props> = ({ onRefresh }) => {
  const [nome, setNome] = useState("");

  const inserir = async () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "Digite um nome válido.");
      return;
    }

    try {
      await db.runAsync("INSERT INTO TB_usuarios (Nome) VALUES (?)", [nome]);
      setNome("");
      onRefresh();
    } catch (error) {
      console.error("Erro ao inserir:", error);
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: "bold" }}>Inserir</Text>
      <TextInput
        placeholder="Nome"
        style={inputStyle}
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Inserir" onPress={inserir}/>
    </View>
  );
};

const inputStyle = {
  height: 40,
  borderColor: "gray",
  borderWidth: 1,
  marginBottom: 10,
  marginTop: 10,
  paddingLeft: 8,
};

export default InserirUsuario;
