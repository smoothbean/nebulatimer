import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import Inner from './Inner';

const img = require('./assets/images/nebulalogo.png');
const backgroundImg = require('./assets/images/nebula.jpg');

export default function App() {
  const [currentTime, setCurrentTime] = useState(moment(new Date(), 'mm:ss'));

  setTimeout(() => {
    setCurrentTime(moment(new Date(), 'mm:ss'));
  }, 1000);

  return (
    <View style={styles.container}>
      <View style={styles.timeWrapper}>
        <Text style={styles.time}>{currentTime.format('HH:mm')}</Text>
      </View>
      <ImageBackground
        source={backgroundImg}
        resizeMode="stretch"
        style={styles.backgroundImg}
      >
        <View style={styles.fullWidth}>
          <Image source={img} style={styles.logo} />
          <Inner />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullWidth: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    margin: 20,
  },
  backgroundImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  text: {
    width: null,
    color: 'white',
    fontSize: 20,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  timeWrapper: {
    position: 'absolute',
    zIndex: 1000,
    right: 10,
  },
  time: {
    fontSize: 25,
    color: '#fff',
  },
});
