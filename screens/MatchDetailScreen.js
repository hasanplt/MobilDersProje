import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import getLatLngFromAddress from '../data/mapsapi';

const MatchDetailScreen = ({ route }) => {
  const { match } = route.params;
  const navigation = useNavigation();
  const parsedDate = parseISO(match.date);
  const formattedDate = format(parsedDate, 'd MMMM yyyy', { locale: tr });
  const formattedTime = format(parsedDate, 'HH:mm');
  const [isFavorite, setIsFavorite] = useState(false);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    checkIsFavorite();
    getLatLng();
  }, []);
  const toggleFavorite = async () => {
    try {
      const favoriteMatches = await AsyncStorage.getItem('favoriteMatches');
      let favoriteMatchesArray = favoriteMatches ? JSON.parse(favoriteMatches) : [];
      
      if (isFavorite) {
        // Favoriden çıkar
        favoriteMatchesArray = favoriteMatchesArray.filter(item => item.id !== match.id);
      } else {
        // Favoriye ekle
        favoriteMatchesArray.push(match);
      }

      await AsyncStorage.setItem('favoriteMatches', JSON.stringify(favoriteMatchesArray));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const checkIsFavorite = async () => {
    try {
      const favoriteMatches = await AsyncStorage.getItem('favoriteMatches');
      const favoriteMatchesArray = favoriteMatches ? JSON.parse(favoriteMatches) : [];
      const isFavoriteMatch = favoriteMatchesArray.some(item => item.id === match.id);
      setIsFavorite(isFavoriteMatch);
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const getLatLng = async () => {
    const locationResp = await getLatLngFromAddress(match.stadiumCity, match.stadium);
    setLocation(locationResp ? locationResp : null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.favoriteContainer}>

      <HeaderBackButton onPress={() => navigation.goBack()} />
        <TouchableOpacity onPress={toggleFavorite}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-o'}
              size={30}
              color={isFavorite ? 'red' : 'black'}
              style={styles.favoriteIcon}
            />
          </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('TeamDetailScreen', { teamId: match.homeId,leagueId: match.leagueId })}>
          <Image source={{ uri: match.homeIcon }} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.vs}>{match.homeScore} - {match.awayScore}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TeamDetailScreen', { teamId: match.awayId, leagueId: match.leagueId })}>
          <Image source={{ uri: match.awayIcon }} style={styles.logo} />
        </TouchableOpacity>     
      </View>
      <View style={styles.teamNames}>
        <Text style={styles.teamName}>{match.home}</Text>
        <Text style={styles.teamName}>{match.away}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.date}>{formattedDate} - {formattedTime}</Text>
        <Text style={styles.stadium}>Stadium: {match.stadiumCity}, {match.stadium}</Text>
        <Text style={styles.referee}>Referee: {match.referee}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>Skor</Text>
        <Text style={styles.score}>İlk Yarı: {match.score.halftime.home} - {match.score.halftime.away}</Text>
        <Text style={styles.score}>Maç Sonu: {match.score.fulltime.home} - {match.score.fulltime.away}</Text>
      </View>
      <View style={styles.status}>
        <Text style={styles.statusText}>Status: {match.statusLong} ({match.statusShort})</Text>
      </View>

      <View style={styles.mapContainer}>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
          >
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={match.stadium}
              description={`${match.stadiumCity}, ${match.stadium}`}
            />
          </MapView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 100,
  },
  favoriteIcon:{
    position: 'absolute',
    right: 10,
    top: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginHorizontal: 20,
  },
  vs: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  teamNames: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    alignItems: 'center',
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    marginBottom: 10,
  },
  stadium: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  referee: {
    fontSize: 16,
    color: '#555',
  },
  scoreContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  status: {
    alignItems: 'center',
    marginTop: 20,
  },
  statusText: {
    fontSize: 16,
    color: '#555',
  },
  mapContainer: {
    height: 200,
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  stadium: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  }
});

export default MatchDetailScreen;
