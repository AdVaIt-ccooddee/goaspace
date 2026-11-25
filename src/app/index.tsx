
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GoaScope 🌴</Text>

      <Text style={styles.heading}>Explore Goa</Text>

      <Text style={styles.description}>
        Discover beaches, beautiful places and
        hidden gems across Goa.
      </Text>

      <Text style={styles.message}>
        Your Goa adventure starts here!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6EF',
    justifyContent: 'center',
    padding: 25,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#24543C',
  },
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#24543C',
    marginTop: 30,
  },
  description: {
    fontSize: 16,
    color: '#667568',
    marginTop: 12,
    lineHeight: 24,
  },
  message: {
    fontSize: 17,
    color: '#24543C',
    marginTop: 30,
  },
});
