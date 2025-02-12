/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TimerControl from './TimerControl';
import React, { useState, useRef, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { Audio } from 'expo-av';

type TimerState = 'stopped' | 'rolling' | 'resting' | 'paused';

export default function Inner() {
  const [timerState, setTimerState] = useState<TimerState>('stopped');
  const [currentTime, setCurrentTime] = useState<Moment>(moment('05:00', 'mm:ss'));
  const [roundTime, setRoundTime] = useState<Moment>(moment('05:00', 'mm:ss'));
  const [restTime, setRestTime] = useState<Moment>(moment('01:30', 'mm:ss'));
  const [preRoll, setPreRoll] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [focusedButton, setFocusedButton] = useState<number | null>(null);

  const playSound = async (soundFile: any) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  useEffect(() => {
    if (currentTime.format('mm:ss') === '00:00') {
      if (timerState === 'rolling') {
        playSound(require('./assets/sounds/timer_end.mp3')); // Play end sound
        setTimerState('resting');
        setCurrentTime(restTime);
      } else if (timerState === 'resting') {
        setPreRoll(true);
        playSound(require('./assets/sounds/timer.mp3')); // Play pre-roll sound
        setTimeout(() => {
          setPreRoll(false);
          setTimerState('rolling');
          setCurrentTime(roundTime);
        }, 3000);
      }
    }
  }, [currentTime, timerState, roundTime, restTime]);

  const handleToggleRoll = () => {
    if (timerState === 'rolling' || timerState === 'resting') {
      setCurrentTime(roundTime);
      clearInterval(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = null;
      setTimerState('stopped');
    } else {
      setPreRoll(true);
      playSound(require('./assets/sounds/timer.mp3')); // Play pre-roll sound
      setTimeout(() => {
        setPreRoll(false);
        intervalRef.current = setInterval(() => {
          setCurrentTime((prevTime) => prevTime.clone().subtract(1, 'second'));
        }, 1000);
        setTimerState('rolling');
      }, 3000);
    }
  };

  const handlePause = () => {
    setTimerState('paused');
    clearInterval(intervalRef.current as NodeJS.Timeout);
    intervalRef.current = null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {preRoll || timerState === 'stopped'
          ? 'Get Ready!'
          : currentTime.format('mm:ss')}
      </Text>
      <Text style={styles.periodType}>({timerState})</Text>
      <View style={styles.cards}>
        <TimerControl
          add={() => {
            const newVal = roundTime.clone().add(10, 'seconds');
            setRoundTime(newVal);
            setCurrentTime(newVal);
          }}
          take={() => {
            const newVal = roundTime.clone().subtract(10, 'seconds');
            setRoundTime(newVal);
            setCurrentTime(newVal);
          }}
          title="Round Time"
          value={roundTime.format('mm:ss')}
          disabled={preRoll || timerState !== 'stopped'}
          btnKey={1}
        />
        <TimerControl
          add={() => setRestTime(restTime.clone().add(10, 'seconds'))}
          take={() => setRestTime(restTime.clone().subtract(10, 'seconds'))}
          title="Rest Time"
          value={restTime.format('mm:ss')}
          disabled={preRoll || timerState !== 'stopped'}
          btnKey={3}
        />
      </View>
      <View style={styles.row}>
        {!preRoll && timerState === 'rolling' && (
          <TouchableOpacity
            focusable
            style={[
              styles.btn,
              { backgroundColor: focusedButton === 6 ? '#ccc' : '#ffffff' },
            ]}
            key={6}
            onPress={handlePause}
            disabled={preRoll}
            nextFocusRight={7}
            nextFocusDown={7}
            onFocus={() => setFocusedButton(6)}
            onBlur={() => setFocusedButton(null)}
          >
            <Text style={{ ...styles.text, color: '#000000' }}>Pause</Text>
          </TouchableOpacity>
        )}
        <View style={styles.marginLeft}>
          <TouchableOpacity
            focusable
            style={[
              styles.btn,
              { backgroundColor: focusedButton === 7 ? '#ccc' : '#000000' },
            ]}
            key={7}
            onPress={handleToggleRoll}
            disabled={preRoll}
            nextFocusLeft={6}
            onFocus={() => setFocusedButton(7)}
            onBlur={() => setFocusedButton(null)}
          >
            <Text style={styles.text}>
              {timerState === 'paused' || timerState === 'stopped'
                ? 'Roll'
                : 'Stop'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  time: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 100,
    backgroundColor: '#000000c0',
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
  },
  periodType: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    backgroundColor: '#000000c0',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  cards: {
    flexDirection: 'row',
    marginTop: 25,
  },
  row: {
    flexDirection: 'row',
  },
  marginLeft: {
    marginLeft: 20,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  btn: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
