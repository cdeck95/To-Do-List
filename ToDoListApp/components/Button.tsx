import React from 'react';
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

export default function Button(props: { onPress: any; title: string }) {
  const { onPress, title } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    backgroundColor: '#fff',
    borderColor: "#55BCF6",
    borderWidth: 1,
    height: 50,
    wdith: 50,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 15
  },
  text: {
    fontSize: 20,
    color: '#55BCF6',
  },
});