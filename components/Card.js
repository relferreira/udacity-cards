import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { gray } from '../utils/colors';

const Card = ({ title, num, style, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.card, style]} {...rest}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{num} cards</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 7,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 1
  },
  title: {
    fontSize: 24
  },
  description: {
    fontSize: 16,
    color: gray
  }
});

export default Card;
