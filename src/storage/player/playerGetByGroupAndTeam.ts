import { playersGetByGroup } from "./playerGetByGroup"

export async function playerGetByGroupAndTeam(group: string, team: string){
  try {
    const players = await playersGetByGroup(group)

    const playersFilteredByTeam = players.filter((player) => player.team === team)
    return playersFilteredByTeam
  } catch (error) {
    throw error
  }
}