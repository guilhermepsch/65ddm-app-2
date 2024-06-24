// screens/DiscordScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type DiscordScreenProps = {
  route: {
    params: {
      adId: string;
    };
  };
  navigation: NativeStackNavigationProp<RootStackParamList, 'Discord'>;
};

const DiscordScreen: React.FC<DiscordScreenProps> = ({ route }) => {
  const { adId } = route.params;
  const [discord, setDiscord] = useState<string>('');

  useEffect(() => {
    axios.get(`http://192.168.4.14:3333/ads/${adId}/discord`)
      .then(response => setDiscord(response.data.discord))
      .catch(error => console.error(error));
  }, [adId]);

  return (
    <View style={styles.container}>
      <Text style={styles.discord}>Discord: {discord}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f1c',
  },
  discord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e94560',
  },
});

export default DiscordScreen;
