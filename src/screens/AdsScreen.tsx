// screens/AdsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Button,
} from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

interface Ad {
	id: string;
	name: string;
	yearsPlaying: number;
	useVoiceChannel: boolean;
	hourStart: string;
	hourEnd: string;
}

type AdsScreenProps = {
	route: {
		params: {
			gameId: string;
		};
	};
	navigation: NativeStackNavigationProp<RootStackParamList, 'Ads'>;
};

const AdsScreen: React.FC<AdsScreenProps> = ({ route, navigation }) => {
	const { gameId } = route.params;
	const [ads, setAds] = useState<Ad[]>([]);

	useEffect(() => {
		axios
			.get(`http://192.168.4.14:3333/games/${gameId}/ads`)
			.then(response => setAds(response.data))
			.catch(error => console.error(error));
	}, [gameId]);

	return (
		<View style={styles.container}>
			<View style={styles.button}>
				<Button
					title="Add Ad"
					onPress={() => navigation.navigate('AddAd', { gameId })}
					color="#e94560"
				/>
			</View>
			<FlatList
				data={ads}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.adItem}
						onPress={() =>
							navigation.navigate('Discord', { adId: item.id })
						}>
						<Text style={styles.adTitle}>{item.name}</Text>
						<View style={styles.adDetails}>
							<Text style={styles.adDetailText}>
								{item.yearsPlaying} Years Playing
							</Text>
							<Text style={styles.adDetailText}>
								{item.useVoiceChannel
									? 'Uses Voice Channel'
									: 'No Voice Channel'}
							</Text>
							<Text style={styles.adDetailText}>
								{item.hourStart} - {item.hourEnd}
							</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0f0f1c',
		paddingHorizontal: 16,
		gap: 10,
	},
	adItem: {
		backgroundColor: '#1e1e3c',
		padding: 16,
		marginBottom: 12,
		borderRadius: 8,
	},
	adTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#e94560',
		marginBottom: 8,
	},
	adDetails: {
		marginTop: 8,
	},
	adDetailText: {
		color: '#4cafab',
		marginBottom: 4,
	},
  button: {
    marginTop: 20
  }
});

export default AdsScreen;
