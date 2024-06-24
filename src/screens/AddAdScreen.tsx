import React, { useState } from 'react';
import {
	View,
	TextInput,
	Button,
	StyleSheet,
	Alert,
	TouchableOpacity,
	Modal,
	Text,
	TextInputProps,
} from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type AddAdScreenProps = {
	route: {
		params: {
			gameId: string;
		};
	};
	navigation: NativeStackNavigationProp<RootStackParamList, 'AddAd'>;
};

const AddAdScreen: React.FC<AddAdScreenProps> = ({ route, navigation }) => {
	const { gameId } = route.params;
	const [name, setName] = useState<string>('');
	const [yearsPlaying, setYearsPlaying] = useState<number | null>(null);
	const [discord, setDiscord] = useState<string>('');
	const [weekDays, setWeekDays] = useState<number[]>([]);
	const [hourStart, setHourStart] = useState<string>('');
	const [hourEnd, setHourEnd] = useState<string>('');
	const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
	const [showWeekdayModal, setShowWeekdayModal] = useState<boolean>(false);

	const toggleWeekdayModal = () => {
		setShowWeekdayModal(!showWeekdayModal);
	};

	const handleWeekdaySelection = (day: number) => {
		if (weekDays.includes(day)) {
			setWeekDays(weekDays.filter(d => d !== day));
		} else {
			setWeekDays([...weekDays, day]);
		}
		console.log(weekDays);
	};

	const handleAddAd = () => {
		if (!validateForm()) {
			return;
		}

		axios
			.post(`http://192.168.4.14:3333/games/${gameId}/ads`, {
				name,
				yearsPlaying,
				discord,
				weekDays,
				hourStart,
				hourEnd,
				useVoiceChannel,
			})
			.then(() => {
				Alert.alert('Success', 'Ad created successfully');
				navigation.goBack();
			})
			.catch(error => console.error(error));
	};

	const validateForm = () => {
		if (!name.trim()) {
			Alert.alert('Error', 'Name cannot be empty');
			return false;
		}
		if (yearsPlaying === null || isNaN(yearsPlaying)) {
			Alert.alert('Error', 'Years Playing must be a valid number');
			return false;
		}
		if (!discord.trim()) {
			Alert.alert('Error', 'Discord cannot be empty');
			return false;
		}
		if (weekDays.length === 0) {
			Alert.alert('Error', 'Select at least one Week Day');
			return false;
		}
		if (!hourStart.trim() || !hourEnd.trim()) {
			Alert.alert('Error', 'Start Hour and End Hour cannot be empty');
			return false;
		}
		return true;
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Name"
				value={name}
				onChangeText={setName}
				placeholderTextColor="#ccc"
			/>
			<NumericInput
        // @ts-ignore
				value={yearsPlaying}
				onChangeText={(text: string) =>
					setYearsPlaying(parseInt(text, 10))
				}
				placeholder="Years Playing"
				keyboardType="numeric"
				style={styles.input}
			/>
			<TextInput
				style={styles.input}
				placeholder="Discord"
				value={discord}
				onChangeText={setDiscord}
				placeholderTextColor="#ccc"
			/>
			<TouchableOpacity
				style={styles.weekdayButton}
				onPress={toggleWeekdayModal}>
				<Text style={styles.weekdayButtonText}>
					{weekDays.length > 0
						? weekDays.join(', ')
						: 'Select Week Days'}
				</Text>
			</TouchableOpacity>
			<TextInput
				style={styles.input}
				placeholder="Start Hour"
				value={hourStart}
				onChangeText={setHourStart}
				placeholderTextColor="#ccc"
			/>
			<TextInput
				style={styles.input}
				placeholder="End Hour"
				value={hourEnd}
				onChangeText={setHourEnd}
				placeholderTextColor="#ccc"
			/>
			<CheckboxInput
				label="Use Voice Channel"
				value={useVoiceChannel}
				onValueChange={setUseVoiceChannel}
			/>
			<Button title="Add Ad" onPress={handleAddAd} color="#e94560" />

			<Modal
				animationType="slide"
				transparent={true}
				visible={showWeekdayModal}
				onRequestClose={toggleWeekdayModal}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Select Week Days</Text>
						<View >
							{[
								{ name: 'Monday', value: 0 },
								{ name: 'Tuesday', value: 1 },
								{ name: 'Wednesday', value: 2 },
								{ name: 'Thursday', value: 3 },
								{ name: 'Friday', value: 4 },
								{ name: 'Saturday', value: 5 },
								{ name: 'Sunday', value: 6 },
							].map(day => (
								<TouchableOpacity
									key={day.name}
									style={[
										styles.checkbox,
										weekDays.includes(day.value) &&
											styles.checked,
									]}
									onPress={() =>
										handleWeekdaySelection(day.value)
									}>
									<Text style={styles.checkboxText}>
										{day.name}
									</Text>
								</TouchableOpacity>
							))}
						</View>
						<Button title="Close" onPress={toggleWeekdayModal} />
					</View>
				</View>
			</Modal>
		</View>
	);
};

const NumericInput: React.FC<TextInputProps> = props => {
	return (
		<TextInput
			{...props}
			style={[styles.input, props.style]}
			keyboardType="numeric"
			placeholderTextColor="#ccc"
		/>
	);
};

const CheckboxInput: React.FC<{
	label: string;
	value: boolean;
	onValueChange: (value: boolean) => void;
}> = ({ label, value, onValueChange }) => {
	return (
		<View >
			<Button
				title={value ? '✓ ' + label : '◯ ' + label}
				onPress={() => onValueChange(!value)}
				color="#e94560"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0f0f1c',
		paddingHorizontal: 16,
		paddingTop: 24,
    gap: 10
	},
	input: {
		backgroundColor: '#1e1e3c',
		color: '#fff',
		borderWidth: 1,
		borderColor: '#1e1e3c',
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
	},
	weekdayButton: {
		backgroundColor: '#1e1e3c',
		color: '#fff',
		borderWidth: 1,
		borderColor: '#1e1e3c',
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	weekdayButtonText: {
		color: '#ccc',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		paddingHorizontal: 20,
	},
	modalContent: {
		backgroundColor: '#1e1e3c',
		padding: 20,
		borderRadius: 8,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 10,
	},
	checkbox: {
		backgroundColor: '#1e1e3c',
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#ccc',
		margin: 5,
	},
	checked: {
		backgroundColor: '#e94560',
	},
	checkboxText: {
		color: '#fff',
	},
});

export default AddAdScreen;
