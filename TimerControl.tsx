import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function TimerControl({
  title,
  value,
  add,
  take,
  disabled,
  addKey,
  takeKey,
  onFocus,
  focusedButton,
}: any) {
  console.log(focusedButton, takeKey, addKey, { ...focusedButton === takeKey ? { backgroundColor: '#FBCC09' } : {} });
  return (
    <View style={styles.card}>
      <Text style={{ ...styles.text, ...{ fontSize: 14 } }}>{title}</Text>
      <View style={styles.timeCtrl}>
        <TouchableHighlight
          underlayColor="transparent"
          style={{ ...styles.btn, ...focusedButton === takeKey ? { backgroundColor: '#FBCC09' } : {} }}
          onPress={take}
          disabled={disabled}
          onFocus={() => { onFocus(takeKey); }}
        >
          <Text style={styles.text}>-</Text>
        </TouchableHighlight>
        <Text style={styles.text}>{value}</Text>
        <TouchableHighlight
          style={{ ...styles.btn, ...focusedButton === addKey ? { backgroundColor: '#FBCC09' } : {} }}
          onPress={add}
          disabled={disabled}
          onFocus={() => { onFocus(addKey); }}
        >
          <Text style={styles.text}>+</Text>
        </TouchableHighlight>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: '#000000c0',
    fontSize: 20,
    margin: 20,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 24,
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
