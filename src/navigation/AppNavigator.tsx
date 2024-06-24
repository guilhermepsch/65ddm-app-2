import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GamesScreen from '../screens/GameScreen';
import AdsScreen from '../screens/AdsScreen';
import AddAdScreen from '../screens/AddAdScreen';
import DiscordScreen from '../screens/DiscordScreen';

export type RootStackParamList = {
	Games: undefined;
	Ads: { gameId: string };
	AddAd: { gameId: string };
	Discord: { adId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Games">
				<Stack.Screen name="Games" component={GamesScreen} />
				{/* @ts-ignore */}
				<Stack.Screen name="Ads" component={AdsScreen} />
				{/* @ts-ignore */}
				<Stack.Screen name="AddAd" component={AddAdScreen} />
				{/* @ts-ignore */}
				<Stack.Screen name="Discord" component={DiscordScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
