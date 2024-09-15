
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/NavBar';
import InteractiveImages from './components/AppImage';
import AboutPage from './components/About';
import ContactPage from './components/ContactPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('Home');

  const handleNavPress = (screen) => {
    setCurrentPage(screen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return (
          <View style={styles.content}>
            <InteractiveImages 
              image1={require('./assets/duck.png')}
              image2={require('./assets/duck2.png')}
            />
          </View>
        );
      case 'About':
        return <AboutPage />;
      case 'Contact':
        return <ContactPage />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <View style={styles.container}>
      <Header title="Baby Peach's App" />
      <Navbar onPress={handleNavPress} />
      {renderPage()}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40,
    backgroundColor: '#FFF5EE', 


  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});