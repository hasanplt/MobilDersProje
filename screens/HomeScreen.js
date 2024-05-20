import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MatchItem from '../components/MatchItem';
import getMatches from '../data/matches';

export default function HomeScreen({ navigation }) {
  const [matchData, setMatchData] = useState([]);
  const [favoriteMatches, setFavoriteMatches] = useState([]);
  const handleFavoritesPress = () => {
    navigation.navigate('FavoriteMatchesScreen', { favoriteMatches });
  };
  const fetchData = async () => {
    const response = await getMatches();
    const matches = response.response.map(element => ({
      id: element.fixture.id,
      date: element.fixture.date,
      home: element.teams.home.name,
      homeIcon: element.teams.home.logo,
      homeScore: element.goals.home,
      away: element.teams.away.name,
      awayIcon: element.teams.away.logo,
      awayScore: element.goals.away,
      stadium: element.fixture.venue.name,
      stadiumCity: element.fixture.venue.city,
      referee: element.fixture.referee,
      homeId: element.teams.home.id,
      awayId: element.teams.away.id,
      leagueId: element.league.id,
      score: {
        halftime: {
          home: element.score.halftime.home,
          away: element.score.halftime.away,
        },
        fulltime: {
          home: element.score.fulltime.home,
          away: element.score.fulltime.away,
        }
      },
      statusLong: element.fixture.status.long,
      statusShort: element.fixture.status.short
    }));

    const sortedMatches = matches.sort((a, b) => new Date(a.date) - new Date(b.date));
    setMatchData(sortedMatches);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderMatchItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MatchDetail', { match: item })}>
      <MatchItem match={item} />
    </TouchableOpacity>
  );

  const renderMenu = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={[styles.menuItem, styles.favoriteMatchesButton]} onPress={handleFavoritesPress}>
        <Text style={[styles.menuText]}>Favori Maçlar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderMenu()}
      <FlatList
        data={matchData}
        renderItem={renderMatchItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.matchesTCHBL} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  menuContainer: {
    position: 'absolute',
    bottom:0,
    left: 0,
    right: 0,
    zIndex: 999

  },
  menuItem: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  favoriteMatchesButton: {
    backgroundColor: 'lightgreen', // Favori Maçlar butonunun arka plan rengi
  },
  matchesTCHBL:{
    marginBottom: 40
  }
});
