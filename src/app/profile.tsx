
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      <Text style={styles.description}>
        Login and account details will be added later.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6EF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#24543C',
  },
  description: {
    fontSize: 15,
    color: '#667568',
    marginTop: 15,
    textAlign: 'center',
  },
});
