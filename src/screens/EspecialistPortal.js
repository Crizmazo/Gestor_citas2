import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const EspecialistPortal = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado con foto e información */}
      <View style={styles.header}>
        <Text style={styles.title}>En Linea</Text>
        <Image
          source={require('../../assets/doctor-avatar.png')} 
          style={styles.avatar}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.name}>Dr. </Text>
          
        </View>
      </View>

      {/* Opciones principales */}
      <View style={styles.menu}>
        <MenuItem title="cita" onPress={() => navigation.navigate('Citas')} icon="📝" />
        <MenuItem title="Historial" onPress={() => navigation.navigate('historial')} icon="📜" />
        <MenuItem title="Pacientes" onPress={() => navigation.navigate('pacientes')} icon="👥" />
      </View>
    </ScrollView>
  );
};

// Componente reutilizable para ítems del menú
const MenuItem = ({ title, onPress, icon }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.icon}>{icon}</Text>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>Lorem Ipsum</Text>
    </View>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0a1d42',
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  doctorInfo: {
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  specialty: {
    color: '#ccc',
    fontSize: 16,
  },
  menu: {
    backgroundColor: '#1e2a47',
    borderRadius: 12,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#2e3c5d',
    borderBottomWidth: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuSubtitle: {
    color: '#aaa',
    fontSize: 12,
  },
  arrow: {
    color: '#fff',
    fontSize: 20,
  },
});

export default EspecialistPortal;

  
  
  

