import React, { useState, useEffect, useContext } from "react";

import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../services/firebaseConfig";
import { AuthContext } from "../context/AutenticacionContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const PatientPortalScreen = ({ navigation }) => {
 const { user} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Portal del Paciente</Text>
        <Text style={styles.welcome}>{ 'Bienvenido al portal del paciente ' + user.name}</Text>
        <Button
          title="Ir a la agenda"
          onPress={() => navigation.navigate("Citas")}
          color="blue"
        />
        <Button
          title="Cerrar sesión"
          onPress={() => {
    
            navigation.navigate("Login");
          }}
          color="#d9534f"
        />
        <Button
          title="Cancelar/Reprogramar cita"
          onPress={() => navigation.navigate("Cancelacion_Reprogramacion")}
          color="#d9534f"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  welcome: {
    marginBottom: 16,
    fontSize: 16,
    color: "#2c3e50",
  },
  pickerContainer: {
    marginBottom: 12,
    borderWidth: 0.5,
    borderRadius: 15,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ccc",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default PatientPortalScreen;
