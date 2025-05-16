import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, query, where, addDoc, deleteDoc, getFirestore, doc, updateDoc } from 'firebase/firestore';
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
            const citaRef = await addDoc(collection(db, 'citas'), {
                fecha: disponibilidad.fecha,
                hora: disponibilidad.hora,
                id_especialista: disponibilidad.id_especialista,
                id_paciente: user.uid,
                nombre_paciente: user.name,
            });

            const citaId = citaRef.id;

            // Actualizar perfil del paciente con la cita
            const pacienteRef = doc(db, 'users', user.uid); // Asegúrate de que 'users' es la colección correcta
            await updateDoc(pacienteRef, {
                citaId: citaId, // Guarda el ID de la cita en el perfil del paciente
            });

            // Actualizar perfil del especialista con la cita
             const especialistaRef = doc(db, 'users', disponibilidad.id_especialista);  //accessing with id
             await updateDoc(especialistaRef, {
                citaId: citaId,
            });

            await deleteDoc(doc(db, 'disponibilidad', disponibilidad.id)); //eliminar disponibilidad

            Alert.alert('Cita agendada con éxito');
             navigation.navigate('PatientPortalScreen');

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
