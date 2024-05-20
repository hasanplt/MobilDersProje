
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import MatchDetailScreen from './screens/MatchDetailScreen';
import FavoriteMatchesScreen from './screens/FavoriteMatchesScreen';
import TeamDetailScreen from './screens/TeamDetailScreen';
import TeamOldMatches from './screens/TeamOldMatches';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MatchDetail" component={MatchDetailScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="FavoriteMatchesScreen" component={FavoriteMatchesScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="TeamDetailScreen" component={TeamDetailScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="TeamOldMatches" component={TeamOldMatches}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
