
import { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const places = [
  {
    name: 'Butterfly Beach',
    location: 'Canacona, South Goa',
    category: 'Beaches',
    price: 'Free',
    description: 'A peaceful beach surrounded by greenery and beautiful views.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
  },
  {
    name: 'Netravali Waterfall',
    location: 'Netravali, South Goa',
    category: 'Waterfalls',
    price: '₹50',
    description: 'A beautiful waterfall surrounded by dense forest.',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800'
  },
  {
    name: 'Chorla Ghat',
    location: 'North Goa',
    category: 'Nature',
    price: 'Free',
    description: 'Scenic mountain roads, greenery and misty landscapes.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800'
  },
  {
    name: 'Cabo de Rama',
    location: 'Canacona, South Goa',
    category: 'Historical',
    price: 'Free',
    description: 'Historic fort with spectacular Arabian Sea views.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'
  },
  {
    name: 'Arambol Sweet Water Lake',
    location: 'Arambol, North Goa',
    category: 'Nature',
    price: 'Free',
    description: 'A freshwater lake close to the beach.',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800'
  }
];

const categories = ['All', 'Beaches', 'Waterfalls', 'Nature', 'Historical'];

export default function HiddenGemsScreen() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('All');

  const filteredPlaces = places.filter(place => {
    const matchesSearch =
      place.name.toLowerCase().includes(search.toLowerCase()) ||
      place.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selected === 'All' || place.category === selected;

    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>GoaSpace 🌴</Text>
        <Text style={styles.heading}>Hidden Gems</Text>
        <Text style={styles.subtitle}>
          Discover the unexplored side of Goa.
        </Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="🔍 Search hidden places..."
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.category,
              selected === category && styles.activeCategory
            ]}
            onPress={() => setSelected(category)}
          >
            <Text style={[
              styles.categoryText,
              selected === category && styles.activeText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Explore places</Text>

      {filteredPlaces.map((place, index) => (
        <View style={styles.card} key={index}>
          <Image source={{ uri: place.image }} style={styles.image} />

          <View style={styles.cardContent}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text style={styles.location}>📍 {place.location}</Text>
            <Text style={styles.description}>{place.description}</Text>

            <View style={styles.bottomRow}>
              <Text style={styles.price}>Entry: {place.price}</Text>
              <Text style={styles.tag}>{place.category}</Text>
            </View>
          </View>
        </View>
      ))}

      {filteredPlaces.length === 0 && (
        <Text style={styles.empty}>No places found.</Text>
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8F5',
  },
  header: {
    backgroundColor: '#075B50',
    padding: 25,
    paddingTop: 55,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 25,
  },
  subtitle: {
    color: '#D6E9E2',
    fontSize: 14,
    marginTop: 7,
  },
  search: {
    backgroundColor: '#FFFFFF',
    margin: 18,
    padding: 15,
    borderRadius: 12,
    fontSize: 14,
  },
  category: {
    paddingVertical: 10,
    paddingHorizontal: 17,
    backgroundColor: '#E3EBE7',
    borderRadius: 20,
    marginLeft: 12,
  },
  activeCategory: {
    backgroundColor: '#075B50',
  },
  categoryText: {
    color: '#333333',
    fontWeight: '600',
  },
  activeText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    margin: 18,
    color: '#173C35',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 190,
  },
  cardContent: {
    padding: 15,
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#173C35',
  },
  location: {
    color: '#777777',
    marginTop: 6,
  },
  description: {
    color: '#555555',
    marginTop: 10,
    lineHeight: 21,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  price: {
    fontWeight: 'bold',
    color: '#075B50',
  },
  tag: {
    backgroundColor: '#E1F0E9',
    color: '#075B50',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777777',
  },
});
