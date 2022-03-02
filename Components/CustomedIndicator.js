import { StyleSheet, ActivityIndicator, View } from 'react-native';

export default function CustomedIndicator() {
  return (
    <ActivityIndicator
      size='large'
      animating={true}
      color='tomato'
    />
  )
}

const styles = StyleSheet.create({
  indicatorContainer: {
    width: '100%',
    padding: 5,
  }
})
