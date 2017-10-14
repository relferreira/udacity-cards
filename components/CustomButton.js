import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { white, accentColor } from '../utils/colors';

const CustomButton = ({ children, style, textStyle, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} {...rest}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: accentColor,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  text: {
    textAlign: 'center',
    color: white
  }
});

export default CustomButton;
