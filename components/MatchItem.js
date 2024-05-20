import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

const MatchItem = ({ match }) => {
  const parsedDate = parseISO(match.date);
  const formattedDate = format(parsedDate, 'd MMMM yyyy', { locale: tr });
  const formattedTime = format(parsedDate, 'HH:mm');
  return (
    <View style={styles.container}>
      <View style={styles.teamContainer}>
        <Image source={{ uri: match.homeIcon }} style={styles.logo} />
        <Text style={styles.team}>{match.home}</Text>
      </View>
      <Text style={styles.vs}>{match.homeScore} - {match.awayScore}</Text>
      <View style={styles.teamContainer}>
        <Image source={{ uri: match.awayIcon }} style={styles.logo} />
        <Text style={styles.team}>{match.away}</Text>
      </View>
      <Text style={styles.details}>{formattedDate} - {formattedTime}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'column',
    alignItems: 'center',
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  team: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vs: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  details: {
    fontSize: 16,
    color: '#555',
  },
});

export default MatchItem;
