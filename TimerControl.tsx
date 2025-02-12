import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TimerControl({
  title,
  value,
  add,
  take,
  disabled,
  btnKey,
}: any) {
  const [focusedButton, setFocusedButton] = useState(null);

  const btnStyle = {
    ...styles.btn,
    ...{
      backgroundColor: focusedButton === btnKey ? '#FFD700' : '#841584',
    },
  };

  const btn2Style = {
    ...styles.btn,
    ...{
      backgroundColor: focusedButton === btnKey + 1 ? '#FFD700' : '#841584',
    },
  };

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.timeCtrl}>
        <TouchableOpacity
          focusable
          style={btnStyle}
          key={btnKey}
          onPress={take}
          disabled={disabled}
          nextFocusRight={btnKey + 1}
          nextFocusDown={7}
          onFocus={() => setFocusedButton(btnKey)}
          onBlur={() => setFocusedButton(null)}
        >
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{value}</Text>
        <TouchableOpacity
          focusable
          style={btn2Style}
          key={btnKey + 1}
          onPress={add}
          disabled={disabled}
          nextFocusLeft={btnKey}
          nextFocusDown={7}
          onFocus={() => setFocusedButton(btnKey + 1)}
          onBlur={() => setFocusedButton(null)}
        >
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: '#000000c0',
    fontSize: 12,
    margin: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  timeCtrl: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#841584',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
