import React, {useEffect, useState} from 'react';
import { StyleSheet, ScrollView, View, Text, Image,TouchableOpacity ,Button, FlatList} from 'react-native';
import  {getTeamInformations,getTeamStatics} from '../data/teamsapi';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getTeamMatches} from '../data/teamsapi';
import MatchItem from '../components/MatchItem';

export default function TeamOldMatches({ route,navigation }) {
    const {leagueId, teamId} = route.params;
    const [teamMatches, setTeamMatches] = useState(null);

    useEffect(() => {
        getTeamMatches(teamId).then((data) => {
            const matches = data.response.map(element => ({
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
              setTeamMatches(matches)
            console.log("info geldi")
            console.log(matches)
        });
    }, []);

    const handleGoBack = () => {
        navigation.goBack();
      };
    const renderMatchItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('MatchDetail', { match: item })}>
          <MatchItem match={item} />
        </TouchableOpacity>
      );

    return (

        <>
            {teamMatches && (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Maç Geçmişi</Text>
                        <TouchableOpacity onPress={handleGoBack}>
                        <Icon name="arrow-left" size={20} color="#333" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={teamMatches}
                        renderItem={renderMatchItem}
                    />
                </View>
            )}
        </>
    )

}

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