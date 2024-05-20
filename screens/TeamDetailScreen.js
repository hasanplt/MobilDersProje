import React, {useEffect, useState} from 'react';
import { StyleSheet, ScrollView, View, Text, Image,TouchableOpacity ,Button} from 'react-native';
import  {getTeamInformations,getTeamStatics} from '../data/teamsapi';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TeamDetailScreen({ route,navigation }) {
    const {leagueId, teamId} = route.params;
    const [teamInfo, setTeamInfo] = useState(null);
    const [teamStats, setTeamStats] = useState(null);

    useEffect(() => {
        getTeamInformations(teamId).then((data) => {
            setTeamInfo(data.response[0])
            console.log("info geldi")
            console.log(data.response[0])
        });

        getTeamStatics(leagueId,teamId).then((data) => {
            setTeamStats(data.response)
            console.log("stats geldi")
            console.log(data.response)
        });
    }, []);
    const getFormStyle = (form) => {
        if (form === 'W') return { color: 'green' };
        if (form === 'D') return { color: 'orange' };
        if (form === 'L') return { color: 'red' };
        return { color: 'black' };
    };
    const handleGoBack = () => {
        navigation.goBack();
      };
    return (
        
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backToGo} onPress={handleGoBack}>
                <Icon name="arrow-left" size={20} color="#333" />
            </TouchableOpacity>
        {teamInfo && teamStats ? (
            <>
                <View style={styles.teamSection}>
                    <Image source={{ uri: teamInfo.team.logo }} style={styles.teamLogo} />
                    <Text style={styles.teamName}>{teamInfo.team.name}</Text>
                    <Text style={styles.teamDetails}>Kuruluş Yılı: {teamInfo.team.founded}</Text>
                    <Text style={styles.teamDetails}>Ülke: {teamInfo.team.country}</Text>
                </View>
                <View style={styles.venueSection}>
                    <Image source={{ uri: teamInfo.venue.image }} style={styles.venueImage} />
                    <Text style={styles.venueName}>{teamInfo.venue.name}</Text>
                    <Text style={styles.venueDetails}>Adres: {teamInfo.venue.address}</Text>
                    <Text style={styles.venueDetails}>Şehir: {teamInfo.venue.city}</Text>
                    <Text style={styles.venueDetails}>Kapasite: {teamInfo.venue.capacity}</Text>
                    <Text style={styles.venueDetails}>Çim Türü: {teamInfo.venue.surface}</Text>
                </View>
                <View style={styles.statsSection}>
                    <Text style={styles.sectionTitle}>İstatistikler</Text>
                    <View style={styles.formSection}>
                        <Text style={styles.statsDetails}>Form: </Text>
                        {teamStats.form.split('').map((result, index) => (
                            <Text key={index} style={[styles.statsDetails, getFormStyle(result)]}>{result}</Text>
                        ))}
                    </View>
                    <Text style={styles.statsDetails}>Oynanan Maç: {teamStats.fixtures.played.total}</Text>
                    <Text style={styles.statsDetails}>Kazanma: {teamStats.fixtures.wins.total}</Text>
                    <Text style={styles.statsDetails}>Berabere: {teamStats.fixtures.draws.total}</Text>
                    <Text style={styles.statsDetails}>Kayıp: {teamStats.fixtures.loses.total}</Text>
                    <Text style={styles.statsDetails}>Gol Sayısı: {teamStats.goals.for.total.total}</Text>
                    <Text style={styles.statsDetails}>Yenen Gol: {teamStats.goals.against.total.total}</Text>
                    <Text style={styles.statsDetails}>Temiz Maçlar: {teamStats.clean_sheet.total}</Text>
                    <Text style={styles.statsDetails}>Kötü Skor: {teamStats.failed_to_score.total}</Text>
                    <Text style={styles.statsDetails}>Ağır Kazanım: {teamStats.biggest.wins.home} (Ev Sahibi), {teamStats.biggest.wins.away} (Deplasman)</Text>
                    <Text style={styles.statsDetails}>Ağır Kayıp: {teamStats.biggest.loses.home} (Ev Sahibi), {teamStats.biggest.loses.away ? teamStats.biggest.loses.away : "*-*"} (Deplasman)</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Maç Geçmişine Bak"
                        onPress={() => navigation.navigate('TeamOldMatches', { teamId, leagueId })}
                    />
                </View>
            </>
        ) : (
            <View style={styles.loaderContainer}>
                <Text style={styles.loaderText}>Yükleniyor...</Text>
            </View>
        )}
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    backToGo:{
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        marginTop: 10,
        fontSize: 16,
    },
    teamSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    teamLogo: {
        width: 100,
        height: 100,
    },
    teamName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    teamDetails: {
        fontSize: 16,
    },
    venueSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    venueImage: {
        width: 300,
        height: 200,
        objectFit: 'contain',
    },
    venueName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    venueDetails: {
        fontSize: 16,
    },
    statsSection: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statsDetails: {
        fontSize: 16,
        marginBottom: 5,
    },
    formSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});