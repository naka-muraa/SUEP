import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function shadowStyle(showShadow) {
  return showShadow ? styles.shadow : styles.barBorder;
}

export default function CustomedSearchBar({
  onChangeText,
  onEndEditing,
  value,
  placeholder,
  onTapIcon,
  style,
  showShadow,
  iconType,
  onSubmitEditing,
}) {
  return (
    <View style={[styles.textInputWrapper, style, shadowStyle(showShadow)]}>
      <TextInput
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        onSubmitEditing={onSubmitEditing}
        value={value}
        placeholder={placeholder}
        autoCapitalize="none"
        style={styles.textInputDesign}
        textStyle={styles.textInpuText}
        maxLength={40}
      />
      <TouchableOpacity onPress={onTapIcon}>
        {iconType == 'search' ? (
          <Ionicons name="ios-search-sharp" size={24} color="black" />
        ) : (
          <Ionicons name="close-circle-sharp" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputWrapper: {
    backgroundColor: 'white',
    paddingVertical: 9,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 8,
  },
  barBorder: {
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  textInputDesign: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInpuText: {
    color: 'black',
  },
});
