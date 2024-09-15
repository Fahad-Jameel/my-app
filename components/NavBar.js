import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Navbar = ({ onPress }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => onPress('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => onPress('About')}>
        <Text>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => onPress('Contact')}>
        <Text>Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#FFF5EE', 
    padding: 10,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navItem: {
    padding: 10,
  },
});

export default Navbar;