import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [buttonAnim] = useState(new Animated.Value(1));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleSubmit = () => {
    alert(`Your message delivered to the useless thank youuuuuu!!!, ${name}!`);
    setName('');
    setEmail('');
    setMessage('');
    
    // Add a fun animation after submission
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonAnim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#8B4513"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#8B4513"
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline
        placeholderTextColor="#8B4513"
      />
      <TouchableOpacity
        onPress={() => {
          animateButton();
          handleSubmit();
        }}
      >
        <Animated.View style={[
          styles.button,
          {
            transform: [{ scale: buttonAnim }]
          }
        ]}>
          <Text style={styles.buttonText}>Send Message</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF5EE', // Seashell (very light peach) background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7F50', // Coral color for title
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFDAB9', // Peach Puff for input background
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFA07A', // Light Salmon for border
    color: '#8B4513', // SaddleBrown for text
    fontSize: 16,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FFA07A', // Light Salmon button
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#8B4513', // SaddleBrown for button text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactPage;