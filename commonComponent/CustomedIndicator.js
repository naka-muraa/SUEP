import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function CustomedIndicator() {
  return <ActivityIndicator size="large" animating={true} color="tomato" />;
}
