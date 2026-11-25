import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export async function saveSearch(city: any) {
  try {
    await addDoc(collection(db, 'weather_searches'), {
      name: city.name,
      country: city.country,
      temperature: city.temperature,
      description: city.description,
      latitude: city.lat,
      longitude: city.lon,
      searchedAt: serverTimestamp(),
    });

    console.log('Search saved to Firebase!');
  } catch (error) {
    console.error('Error saving search:', error);
  }
}