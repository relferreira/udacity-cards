import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { white, gray, accentColor } from '../utils/colors';

const CustomButton = ({ children, style, textStyle, disabled, ...rest }) => {
  return (
    <TouchableOpacity
      style={[styles.btn, style, disabled ? styles.disabled : {}]}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: accentColor,
    borderRadius: 5
  },
  disabled: {
    backgroundColor: gray
  },
  text: {
    textAlign: 'center',
    color: white
  }
});

export default CustomButton;
