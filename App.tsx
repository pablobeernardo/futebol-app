import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TeamEntity from './src/entities/team_entity';
import { Image } from 'expo-image';
import TeamDetail from './details-team';
import { useNavigation } from '@react-navigation/native';

export default function App() {

  //Linha do state
  const [teams, setTeam] = useState<TeamEntity[]>([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigation = useNavigation();
  


  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer test_dd769753f45f74346dbf9e43181a45 ");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };

    let teamsPosition: TeamEntity[] = [];

    fetch("https://api.api-futebol.com.br/v1/campeonatos/10/tabela", requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(dataJson => {
        dataJson.map((team) => {

          const dataTeam = {
            id: team['time']['time_id'], 
            position: team['posicao'], 
            team_shield_url: team['time']['escudo'], 
            team_name: team['time']['nome_popular'],
            team_points: team['pontos'],
            team_goals_scored: team['time']['gols_pro'],
            team_goals_conceded: team['time']['gols_contra'],
            team_goal_difference: team['time']['saldo_gols'],
          };

          teamsPosition.push(dataTeam);
        });
        setTeam(teamsPosition);
        console.log(teamsPosition);
      })
      .catch(error => console.log('error', error));
  }, []);
  

  {selectedTeam && <TeamDetail team={selectedTeam} />}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabela Brasileirão série B</Text>
      <View style={styles.table}>
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(team) =>
            <TouchableOpacity onPress={() => setSelectedTeam(team.item)}>
              <View style={styles.item}>
                <Image style={styles.team_shield} source={team.item.team_shield_url} />
                <Text style={styles.team_position}>{team.item.position}</Text>
                <Text style={styles.team_name}>{team.item.team_name}</Text>
                <Text style={styles.team_position}>{team.item.team_points}</Text>
              </View>
            </TouchableOpacity>
          }

        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 30
  },
  table: {
    flex: 1,
    width: '100%'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 8,
    height: 50
  },
  team_shield: {
    width: 30,
    height: 30
  },
  team_name:{
    fontSize: 20,
    width: 150,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  team_position:{
    width: 30,
    fontSize: 20,
  }
});

