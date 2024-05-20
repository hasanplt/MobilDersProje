import axios from 'axios';
import { format, subWeeks } from 'date-fns';

async function getMatches() {
  
  const today = new Date();
  const oneWeekAgo = subWeeks(today, 1);

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: {
      league: '203', // süper lig code
      season: '2023', // sezon 
      from: format(oneWeekAgo, 'yyyy-MM-dd'),  
      to: format(today, 'yyyy-MM-dd') 
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
}

}

  
// const matches = [
//     { id: 1, team1: 'Team A', team2: 'Team B', date: '2024-05-20', time: '18:00' },
//     { id: 2, team1: 'Team C', team2: 'Team D', date: '2024-05-20', time: '20:00' }
//   ];
  
export default getMatches;