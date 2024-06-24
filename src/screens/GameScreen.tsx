// screens/GamesScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

interface Game {
  id: string;
  title: string;
  _count: {
    ads: number;
  };
}

type GamesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Games'>;
};

const GamesScreen: React.FC<GamesScreenProps> = ({ navigation }) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios.get('http://192.168.4.14:3333/games')
      .then(response => setGames(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gameItem}
            onPress={() => navigation.navigate('Ads', { gameId: item.id })}
          >
            <Text style={styles.gameTitle}>{item.title}</Text>
            <Text style={styles.adsCount}>{item._count.ads} Ads</Text>
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
  },
  gameItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e3c',
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94560',
  },
  adsCount: {
    color: '#4cafab',
    marginTop: 4,
  },
});

export default GamesScreen;
