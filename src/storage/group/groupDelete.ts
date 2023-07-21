import { GROUP_COLECTION } from "@storage/storageConfig"
import { groupsGetAll } from "./groupsGetAll"
import AsyncStorage from "@react-native-async-storage/async-storage"

export async function groupDelete(nameGroup: string){
  try {
    const storedGroups = await groupsGetAll()

    const groupsWithDelete = storedGroups.filter((item) => item !== nameGroup)

    const storage = JSON.stringify(groupsWithDelete)
    await AsyncStorage.setItem(GROUP_COLECTION, storage)

    return 
  } catch (error) {
    throw error
  } 
}