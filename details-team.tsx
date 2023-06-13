import { View , StyleSheet, Text, FlatList} from "react-native";
import { Image } from 'expo-image';


export default function TeamDetail({team}){
    return(
        <View>
            <View>
                <Image style={styles.shield_detail} source={team.item.team_shield_url} />
                <Text>{team.item.team_name}</Text>
            </View>
            <View>
                <FlatList
                data={team}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(team) =>
                <View>
                    <Text>{team.item.position}</Text>
                    <Text>{team.item.team_points}</Text>
                    <Text>Gols marcados: {team.item.team_goals_scored}</Text>
                    <Text>Gols Sofridos: {team.item.team_goals_conceded}</Text>
                    <Text>Saldo de Gols: {team.item.team_goal_difference}</Text>
                </View>
            }
            />
            </View>
        </View>
    );    
}

const styles = StyleSheet.create({
    shield_detail: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 30,
      marginBottom: 16,
      marginHorizontal: 16,
    },


    });