import { StyleSheet, Text, TouchableHighlight, View, TVFocusGuideView } from 'react-native';
import TimerControl from './TimerControl';
import React, { useState, useRef, useEffect } from 'react';
import moment, { Moment } from 'moment';
import Sound from 'react-native-sound';

type TimerState = 'stopped' | 'rolling' | 'resting' | 'paused';

const sounds = {
  timer: require('./assets/sounds/timer.mp3'),
  timerEnd: require('./assets/sounds/timer_end.mp3'),
};

export default function Inner() {
  const [timerState, setTimerState] = useState<TimerState>('stopped');
  const [currentTime, setCurrentTime] = useState<Moment>(moment('05:00', 'mm:ss'));
  const [roundTime, setRoundTime] = useState<Moment>(moment('05:00', 'mm:ss'));
  const [restTime, setRestTime] = useState<Moment>(moment('01:30', 'mm:ss'));
  const [preRoll, setPreRoll] = useState<boolean>(false);
  const intervalRef = useRef<any>(null);
  const [focusedButton, setFocusedButton] = useState<number | false>(false);

  const capitalize = (s: string) => s && String(s[0]).toUpperCase() + String(s).slice(1);

  // Play sound using react-native-sound
  const playSound = (soundFile: string) => {
    console.log(`Loading sound: ${soundFile}`);

    // Use require() for local files instead of MAIN_BUNDLE
    const sound = new Sound(soundFile, (error) => {
      if (error) {
        console.log('Error loading sound', error);
        return;
      }
      console.log('Sound loaded');
      sound.play((success) => {
        if (!success) {
          console.log('Playback failed');
        } else {
          console.log('Sound played successfully');
        }
        sound.release();  // Release the sound resource after playing
      });
    });
  };

  useEffect(() => { console.log('plss', focusedButton) }, [focusedButton]);

  useEffect(() => {
    if (currentTime.format('mm:ss') === '00:00') {
      if (timerState === 'rolling') {
        playSound(sounds.timerEnd);
        setTimerState('resting');
        setCurrentTime(restTime);
      } else if (timerState === 'resting') {
        setPreRoll(true);
        playSound(sounds.timer);
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
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimerState('stopped');
    } else {
      setPreRoll(true);
      playSound(sounds.timer);
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
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleFocusChange = (key: number) => {
    console.log('oioioi', key);
    setFocusedButton(key);
  };

  return (
    <TVFocusGuideView style={styles.container}>
      <Text style={styles.time}>
        {preRoll || timerState === 'stopped'
          ? 'Get Ready!'
          : currentTime.format('mm:ss')}
      </Text>
      <Text style={styles.periodType}>{capitalize(timerState)}</Text>
      <View style={styles.cards}>
        <TimerControl
          takeKey={1}
          take={() => {
            const newVal = roundTime.clone().subtract(10, 'seconds');
            setRoundTime(newVal);
            setCurrentTime(newVal);
          }}
          addKey={2}
          add={() => {
            const newVal = roundTime.clone().add(10, 'seconds');
            setRoundTime(newVal);
            setCurrentTime(newVal);
          }}
          title="Round Time"
          value={roundTime.format('mm:ss')}
          disabled={preRoll || timerState !== 'stopped'}
          onFocus={handleFocusChange}
          focusedButton={focusedButton}
        />
        <TimerControl
          takeKey={3}
          take={() => setRestTime(restTime.clone().subtract(10, 'seconds'))}
          addKey={4}
          add={() => setRestTime(restTime.clone().add(10, 'seconds'))}
          title="Rest Time"
          value={restTime.format('mm:ss')}
          disabled={preRoll || timerState !== 'stopped'}
          onFocus={handleFocusChange}
          focusedButton={focusedButton}
        />
      </View>
      <View style={styles.row}>
        {!preRoll && timerState === 'rolling' && (
          <TouchableHighlight
            style={styles.btn}
            onPress={handlePause}
            disabled={preRoll}
            onFocus={() => handleFocusChange(5)}
          >
            <Text style={styles.text}>Pause</Text>
          </TouchableHighlight>
        )}
        <View style={styles.marginLeft}>
          <TouchableHighlight
            hasTVPreferredFocus={true}
            style={styles.btn}
            onPress={handleToggleRoll}
            disabled={preRoll}
            onFocus={() => handleFocusChange(6)}
          >
            <Text style={styles.text}>
              {timerState === 'paused' || timerState === 'stopped'
                ? 'Roll'
                : 'Stop'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </TVFocusGuideView>
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
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
  },
  periodType: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  cards: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  marginLeft: {
    marginLeft: 20,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  btn: {
    backgroundColor: '#9962EE',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#9962EE',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
