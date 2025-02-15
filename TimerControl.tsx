import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function TimerControl({
  title,
  value,
  add,
  take,
  disabled,
  addBtnKey,
  takeBtnKey,
  focusedButton,
  // setFocusedButton,
}: any) {
  const btnStyle = {
    ...styles.btn,
    ...{
      backgroundColor: focusedButton === addBtnKey ? '#db65db' : '#841584',
    },
  };

  const btn2Style = {
    ...styles.btn,
    ...{
      backgroundColor: focusedButton === takeBtnKey ? '#db65db' : '#841584',
    },
  };

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.timeCtrl}>
        <TouchableHighlight
          focusable
          style={btnStyle}
          key={takeBtnKey}
          onPress={take}
          disabled={disabled}
        // onFocus={() => setFocusedButton(takeBtnKey)}
        >
          <Text style={styles.text}>-</Text>
        </TouchableHighlight>
        <Text style={styles.text}>{value}</Text>
        <TouchableHighlight
          focusable
          style={btn2Style}
          key={addBtnKey}
          onPress={add}
          disabled={disabled}
        // onFocus={() => setFocusedButton(addBtnKey)}

        >
          <Text style={styles.text}>+</Text>
        </TouchableHighlight>
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
