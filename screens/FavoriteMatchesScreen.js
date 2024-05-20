import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatchItem from '../components/MatchItem';

const FavoriteMatchesScreen = ({ navigation }) => {
  const [favoriteMatches, setFavoriteMatches] = useState([]); 
  const renderMatchItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MatchDetail', { match: item })}>
      <MatchItem match={item} />
    </TouchableOpacity>
  );
  const getFavoriteMatches = async () => {
    try {
      const favoriteMatches = await AsyncStorage.getItem('favoriteMatches');
      let favoriteMatchesArray = favoriteMatches ? JSON.parse(favoriteMatches) : [];
      setFavoriteMatches(favoriteMatchesArray);
    } catch (error) {
      console.error('Error fetching favorite matches:', error);
    }
  };
  useEffect(() => {
    getFavoriteMatches();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favori Maçlar</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={favoriteMatches}
        renderItem={renderMatchItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.matchesTCHBL} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  matchContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  matchText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavoriteMatchesScreen;
