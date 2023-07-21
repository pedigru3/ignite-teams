import AsyncStorage from "@react-native-async-storage/async-storage"
import { playersGetByGroup } from "./playerGetByGroup"
import { PLAYER_COLECTION } from "@storage/storageConfig"

export async function playerRemoveByGroup(playerName: string, group: string){
  try {
    const storedPlayers = await playersGetByGroup(group)

    const playersFiltered = storedPlayers.filter((player) => player.name !== playerName)

    const storage = JSON.stringify(playersFiltered)
    
    await AsyncStorage.setItem(`${PLAYER_COLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
  
  return
}