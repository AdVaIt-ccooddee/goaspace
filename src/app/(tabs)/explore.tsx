import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export default function ExploreScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'City not found');
      }

      setWeather(data);

      // Save search to Firebase
      await addDoc(collection(db, 'weather_searches'), {
        name: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        description: data.weather[0].description,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
        createdAt: serverTimestamp(),
      });

      console.log('Saved to Firebase!');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Explore Weather</Text>

      <Text style={styles.subtitle}>
        Search any city to discover its weather.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={searchWeather}>
        <Text style={styles.buttonText}>
          {loading ? 'Searching...' : 'Search'}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {weather && (
        <View style={styles.card}>
          <Text style={styles.name}>
            {weather.name}, {weather.sys.country}
          </Text>

          <Text style={styles.temperature}>
            {Math.round(weather.main.temp)}°C
          </Text>

          <Text style={styles.description}>
            {weather.weather[0].description}
          </Text>

          <Text style={styles.location}>
            Latitude: {weather.coord.lat} | Longitude: {weather.coord.lon}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6EF',
    padding: 20,
  },

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#24543C',
    marginVertical: 20,
  },

  subtitle: {
    fontSize: 16,
    color: '#667568',
    marginBottom: 15,
  },

  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#24543C',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  error: {
    color: 'red',
    marginTop: 15,
  },

  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginTop: 25,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#24543C',
  },

  temperature: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#24543C',
    marginVertical: 10,
  },

  description: {
    fontSize: 17,
    color: '#667568',
    textTransform: 'capitalize',
  },

  location: {
    fontSize: 13,
    color: '#667568',
    marginTop: 10,
  },
});