
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

const restaurants = [
  {
    name: 'Cafe Chocolatti',
    location: 'Candolim, North Goa',
    category: 'Cafe',
    rating: '4.5',
    price: '₹300 - ₹600',
    description: 'A cosy garden cafe with desserts and breakfast.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800'
  },
  {
    name: 'Vinayak Family Restaurant',
    location: 'Assagao, North Goa',
    category: 'Local Food',
    rating: '4.4',
    price: '₹200 - ₹500',
    description: 'Popular for authentic Goan food.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800'
  },
  {
    name: 'Baba Au Rhum',
    location: 'Anjuna, North Goa',
    category: 'Cafe',
    rating: '4.5',
    price: '₹300 - ₹700',
    description: 'A relaxed cafe with great breakfast options.',
    image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800'
  },
  {
    name: 'Ritz Classic',
    location: 'Panaji, North Goa',
    category: 'Local Food',
    rating: '4.3',
    price: '₹250 - ₹600',
    description: 'A well-known restaurant serving Goan favourites.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
  },
  {
    name: 'Artjuna',
    location: 'Anjuna, North Goa',
    category: 'Cafe',
    rating: '4.4',
    price: '₹300 - ₹700',
    description: 'A garden cafe with a relaxed atmosphere.',
    image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800'
  }
];

const categories = ['All', 'Cafe', 'Local Food'];

export default function FoodCafesScreen() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('All');

  const filtered = restaurants.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selected === 'All' || item.category === selected;

    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>GoaSpace 🌴</Text>
        <Text style={styles.heading}>Food & Cafes</Text>
        <Text style={styles.subtitle}>
          Discover the flavours of Goa.
        </Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="🔍 Search cafes and restaurants..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.sectionTitle}>Explore categories</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelected(category)}
            style={[
              styles.category,
              selected === category && styles.activeCategory
            ]}
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

      <Text style={styles.sectionTitle}>Popular in Goa</Text>

      {filtered.map((item, index) => (
        <View style={styles.card} key={index}>
          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>

            <Text style={styles.location}>📍 {item.location}</Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <View style={styles.bottomRow}>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.tag}>{item.category}</Text>
            </View>
          </View>
        </View>
      ))}

      {filtered.length === 0 && (
        <Text style={styles.empty}>No restaurants found.</Text>
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
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    margin: 18,
    color: '#173C35',
  },
  category: {
    backgroundColor: '#E3EBE7',
    paddingVertical: 11,
    paddingHorizontal: 20,
    marginLeft: 12,
    borderRadius: 20,
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
  content: {
    padding: 15,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#173C35',
    flex: 1,
  },
  rating: {
    fontWeight: 'bold',
    color: '#C18416',
    marginLeft: 5,
  },
  location: {
    color: '#777777',
    marginTop: 8,
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
