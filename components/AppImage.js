import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated, PanResponder } from 'react-native';

const AppImage = ({ image1, image2 }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const pan1 = useRef(new Animated.ValueXY()).current;
  const pan2 = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;

  const createPanResponder = (pan) => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value
      });
      Animated.spring(scale, {
        toValue: 1.1,
        friction: 3,
        useNativeDriver: true
      }).start();
    },
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      pan.flattenOffset();
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        friction: 5,
        useNativeDriver: true
      }).start();
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true
      }).start();
    }
  });

  const panResponder1 = useRef(createPanResponder(pan1)).current;
  const panResponder2 = useRef(createPanResponder(pan2)).current;

  const getAnimatedStyle = (pan) => {
    return {
      transform: [
        { translateX: pan.x },
        { translateY: pan.y },
        { scale: scale }
      ]
    };
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.imageWrapper, getAnimatedStyle(pan1)]}
        {...panResponder1.panHandlers}
      >
        <Image source={image1} style={styles.image} />
      </Animated.View>
      <Animated.View
        style={[styles.imageWrapper, getAnimatedStyle(pan2)]}
        {...panResponder2.panHandlers}
      >
        <Image source={image2} style={styles.image} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF5EE', 
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default AppImage;