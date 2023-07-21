import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName: string){
  try {
    const storedGroups = await groupsGetAll()

    const groupAlreadyExists = storedGroups.includes(newGroupName)

    if (groupAlreadyExists){
      throw new AppError('Já existe uma Turma cadastrada com esse nome.')
    }

    const groups = JSON.stringify([...storedGroups, newGroupName])
    await AsyncStorage.setItem(GROUP_COLECTION, groups)

    return 
  } catch (error) {
    throw error
  } 
}