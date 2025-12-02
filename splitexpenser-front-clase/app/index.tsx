import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.apiUrl ?? "";
const TOKEN_KEY = Constants.expoConfig?.extra?.tokenKey ?? "";
export default function Home() {
  const { token, logout } = useContext(AuthContext);
  const router = useRouter();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    loadGroupList();
    if (!token) {
      setTimeout(() => router.replace("/login"), 0);
    
    }
  }, [token]);

  const loadGroupList = async () => {
    try {
      const res = await fetch(`${API_URL}/groups`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      })
      setGroups(await res.json())
      return await res.json();
    } catch (err) {
      return { ok: false, msg: "Network error" };
    }
  };

  const addGroup = async () => {
    try {
      const res = await fetch(`${API_URL}/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      })
      setGroups(await res.json())
      return await res.json();
    } catch (err) {
      return { ok: false, msg: "Network error" };
    }
  };

return (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Sus Grupos</Text>
    <TextInput placeholder="Agregue su grupo"></TextInput>
    <Button title="Registrar"></Button>
    {groups.map((e) => (
      <View key={e}>
        <Text onPress={() => router.replace("/groupdetails")}>{e}</Text>
      </View>
    ))}
    <Button title="Cerrar Sesion" onPress={() => logout()}></Button>
    <Button title="Borrar Cuenta" onPress={() => router.replace("/unregister")} />
  </View>
);
}
