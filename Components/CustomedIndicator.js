import { StyleSheet, ActivityIndicator, View } from 'react-native';

export default function CustomedIndicator() {
  return (
      <ActivityIndicator
        size='large'
        animating={true}
        color='rgba(137,232,207,100)'
      />
)
}

const styles = StyleSheet.create({
  indicatorContainer: {
    width: '100%',
    padding: 5,
  }
})
