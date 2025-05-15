import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, query, where, addDoc, deleteDoc, getFirestore } from 'firebase/firestore';
import { AuthContext } from '../context/AutenticacionContext';

const Citas = () => {
  const { user } = useContext(AuthContext);
  const [disponibles, setDisponibles] = useState([]);

  const db = getFirestore();

  useEffect(() => {
    const cargarDisponibilidad = async () => {
      const snapshot = await getDocs(collection(db, 'disponibilidad'));
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDisponibles(datos);
    };
    cargarDisponibilidad();
  }, []);

  const agendarCita = async (disponibilidad) => {
    try {
      await addDoc(collection(db, 'citas'), {
        fecha: disponibilidad.fecha,
        hora: disponibilidad.hora,
        id_especialista: disponibilidad.id_especialista,
        id_paciente: user.uid
      });

      await deleteDoc(collection(db, 'disponibilidad').doc(disponibilidad.id)); 
      Alert.alert('Cita agendada con éxito');
    } catch (error) {
      console.error(error);
      Alert.alert('Error al agendar cita');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Horarios Disponibles</Text>
      {disponibles.map((disp, index) => (
        <TouchableOpacity
          key={index}
          style={styles.dispoItem}
          onPress={() => agendarCita(disp)}
        >
          <Text>📅 {disp.fecha} ⏰ {disp.hora}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Citas;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  dispoItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
