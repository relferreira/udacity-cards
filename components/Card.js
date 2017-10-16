import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { gray } from '../utils/colors';

const Card = ({ title, num, style, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.card, style]} {...rest}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="cards-outline" size={30} />
        <View style={styles.text}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{num} cards</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 16
    // marginTop: 16,
    // marginLeft: 16,
    // marginRight: 16,
    // borderColor: gray,
    // borderWidth: 1,
    // borderRadius: 7,
    // shadowColor: 'rgba(0, 0, 0, 0.1)',
    // shadowOffset: {
    //   width: 0,
    //   height: 1
    // },
    // shadowRadius: 1,
    // shadowOpacity: 1
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    marginLeft: 16
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
