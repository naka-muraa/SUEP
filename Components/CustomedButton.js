import React from "react";
import { StyleSheet,  TouchableOpacity, Text } from "react-native";

export default function CustomedButton({buttonText, onPress}) {
  return (
    < TouchableOpacity style={styles.buttonDesign} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonDesign: {
    backgroundColor: 'tomato',
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
})
