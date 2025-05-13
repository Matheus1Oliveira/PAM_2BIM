import React, { useState } from "react";
import { TextInput, Button, Alert, Text, View } from "react-native";
import { db } from "../database/db";

type Props = {
  onRefresh: () => void;
};

const AtualizarUsuario: React.FC<Props> = ({ onRefresh }) => {
  const [nomeAntigo, setNomeAntigo] = useState("");
  const [nomeNovo, setNomeNovo] = useState("");

  const atualizar = async () => {
    if (!nomeAntigo.trim() || !nomeNovo.trim()) {
      Alert.alert("Erro", "Preencha os dois nomes.");
      return;
    }

    try {
      await db.runAsync("UPDATE TB_usuarios SET Nome = ? WHERE Nome = ?", [
        nomeNovo,
        nomeAntigo,
      ]);
      setNomeAntigo("");
      setNomeNovo("");
      onRefresh();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>Atualizar Nome</Text>
      <TextInput
        placeholder="Nome antigo"
        style={inputStyle}
        value={nomeAntigo}
        onChangeText={setNomeAntigo}
      />
      <TextInput
        placeholder="Novo nome"
        style={inputStyle}
        value={nomeNovo}
        onChangeText={setNomeNovo}
      />
      <Button title="Atualizar" onPress={atualizar} />
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

export default AtualizarUsuario;
