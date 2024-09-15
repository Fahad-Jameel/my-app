import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Balloon = ({ startPos }) => {
  const position = useRef(new Animated.ValueXY({ x: startPos, y: height })).current;
  const colors = ['#FFDAB9', '#FFE5B4', '#FFEFD5', '#FFE4B5'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    Animated.timing(position, {
      toValue: { x: startPos, y: -100 },
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[
      styles.balloon,
      { transform: position.getTranslateTransform(), backgroundColor: color }
    ]} />
  );
};

const AboutPage = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const [balloons, setBalloons] = useState([]);

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
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      { translateY: slideAnim },
      { scale: scaleAnim }
    ],
  };

  const handleButtonPress = () => {
    alert('Keep smiling and be happy madam!');
    const newBalloons = Array(10).fill().map(() => Math.random() * width);
    setBalloons(newBalloons);
    setTimeout(() => setBalloons([]), 4000);
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.title}>About Baby Peach</Text>
        <Text style={styles.paragraph}>
          I hope this will bring a little smile on your face and you will laugh. This can be the reason for a smile on your face today!
        </Text>
        <Text style={styles.paragraph}>
          My mission is to bring a little cuter smile on your face so you can put extra sunshine in this world 🌟 Let's make the world more cute with your cuteeeeee smile 😊
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleButtonPress}
        >
          <Text style={styles.buttonText}>Click for smile hehe :))</Text>
        </TouchableOpacity>
      </Animated.View>
      {balloons.map((startPos, index) => (
        <Balloon key={index} startPos={startPos} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5EE', 
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7F50', 
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 15,
    lineHeight: 26,
    color: '#8B4513', 
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFA07A',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#8B4513', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  balloon: {
    position: 'absolute',
    width: 30,
    height: 40,
    borderRadius: 20,
  },
});

export default AboutPage;