import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function CustomedSearchBar({ onChangeText, onEndEditing, value, placeholder, onTapIcon }) {
  return (
    < View style={styles.textInputWrapper }>
      <TextInput
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        value={value}
        placeholder={placeholder}
        autoCapitalize='none'
        style={styles.textInputDesign}
        textStyle={styles.textInpuText }
        maxLength={40}
      />
      <TouchableOpacity
        onPress={onTapIcon}>
        <Ionicons name="close-circle-sharp" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  textInputWrapper: {
    marginBottom: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 8,
  },
  textInputDesign: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInpuText: {
    color: 'black'
  },
})
