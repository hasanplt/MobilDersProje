import axios from 'axios';

async function getTeamInformations(teamId){
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
      params: {id: teamId},
      headers: {
        'X-RapidAPI-Key': '1fbe25762bmsh48800ede93d3539p1967cajsnf6849435279b',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);

        return null;
    }
}

async function getTeamStatics(leagueId,teamId){

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
        params: {
          league: leagueId,
          season: 2023,
          team: teamId
        },
        headers: {
          'X-RapidAPI-Key': '1fbe25762bmsh48800ede93d3539p1967cajsnf6849435279b',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return response.data;
      } catch (error) {
          console.error(error);

          return null;
      }
}

async function getTeamMatches(teamId){
    
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: {
      season: '2023',
      team: teamId
    },
    headers: {
      'X-RapidAPI-Key': '1fbe25762bmsh48800ede93d3539p1967cajsnf6849435279b',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export {getTeamInformations,getTeamStatics,getTeamMatches}; 