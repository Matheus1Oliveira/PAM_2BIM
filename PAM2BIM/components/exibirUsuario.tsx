import React from "react";
import { Text, View } from "react-native";

type Usuario = {
  id: number;
  Nome: string;
};

type Props = {
  usuarios: Usuario[];
};

const ExibirUsuarios: React.FC<Props> = ({ usuarios }) => (
  <View style={{ marginVertical: 20 }}>
    {usuarios.map((user) => (
      <Text key={user.id}>
        ID: {user.id} - Nome: {user.Nome}
      </Text>
    ))}
  </View>
);

export default ExibirUsuarios;
