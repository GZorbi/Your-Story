// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';            // ← Νέα εισαγωγή
import MainMenuScreen from './screens/MainMenuScreen';
import OptionsScreen from './screens/OptionsScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import ExitConfirmationScreen from './screens/ExitConfirmationScreen';
import StoryHistoryScreen from './screens/StoryHistoryScreen';
import InstructionsScreen from './screens/InstructionsScreen';
import LanguageScreen from './screens/LanguageScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"       // ← Εδώ η Splash γίνεται πρώτο route
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MainMenu" component={MainMenuScreen} />
      <Stack.Screen name="Options" component={OptionsScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="GameOver" component={GameOverScreen} />
      <Stack.Screen name="ExitConfirmation" component={ExitConfirmationScreen} />
      <Stack.Screen name="StoryHistory" component={StoryHistoryScreen} />
      <Stack.Screen name="Instructions" component={InstructionsScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
    </Stack.Navigator>
  );
}

