import React, { useState } from "react";
import { TextInput, Button, Alert, View, Text } from "react-native";
import { db } from "../database/db";

type Props = {
  onRefresh: () => void;
};

const DeletarUsuario: React.FC<Props> = ({ onRefresh }) => {
  const [nome, setNome] = useState("");

  const deletar = async () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "Digite um nome para deletar.");
      return;
    }

    try {
      await db.runAsync("DELETE FROM TB_usuarios WHERE Nome = ?", [nome]);
      setNome("");
      onRefresh();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Nome para Deletar</Text>
      <TextInput
        placeholder="Nome para deletar"
        style={inputStyle}
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Deletar" onPress={deletar} />
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

export default DeletarUsuario;
