import { Alert, FlatList, TextInput } from "react-native";
import { useCallback, useEffect, useState, useRef } from "react";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";

import { Container, Form, NumberOfPlayers, RenderList } from "./styles";
import { groupDelete } from "@storage/group/groupDelete";
import { err } from "react-native-svg/lib/typescript/xml";
import { PlayerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroup } from "@storage/player/playerGetByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDto";
import { AppError } from "@utils/AppError";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { LoadIndicator } from "@components/loading/styles";

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [playerName, setPlayerName] = useState('')

  const navigation = useNavigation()

  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddNewPlayer(){
    if (playerName.trim().length < 2){
      return Alert.alert('Novo Jogador', 'Digite um nome válido!')
    } 

    try {
      const newPlayer = { name: playerName, team }
      await PlayerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()

      setPlayerName('')
      fetchPlayers()
    } catch (error) {
      if (error instanceof AppError){
        Alert.alert('Novo Jogador', error.message)
      } else {
        Alert.alert('Novo Jogador', 'Ops! Desculpe, algo de errado aconteceu!')
      }
    }
  }

  async function groupRemove() {
    try {
      await groupDelete(group)
      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
    }
  }

  async function handleGroupRemove(){
   Alert.alert(
    'Remover',
    `Deseja mesmo remover o ${group}?`,
    [
      { text: 'Sim', onPress: groupRemove},
      { text: 'Não', style: 'cancel'}
    ]
    )
  }

  async function handleRemovePlayer(playerName: string){
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayers()
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchPlayers(){
    try {
      setIsLoading(true)
      const players = await playerGetByGroupAndTeam(group, team)
      setPlayers(players)
      setIsLoading(false)
    } catch (error) {
      if (error instanceof AppError){
        Alert.alert('Novo Jogador', error.message)
      } else {
        Alert.alert('Novo Jogador', 'Ops! Desculpe, algo de errado aconteceu!')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [team])

  return (
    <Container>
      <Header showBackButton/>
      <Highlight
      title={group}
      subTitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do participante"
          autoCorrect={false}
          onChangeText={setPlayerName}
          value={playerName}
          onSubmitEditing={handleAddNewPlayer}
          returnKeyType="done"
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddNewPlayer}
        />
      </Form>

      <RenderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item} 
              isActive={item == team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </RenderList>

      {
        isLoading ? <LoadIndicator/> :
        <FlatList data={players}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemoved={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty 
            message="Comece adicionando um novo jogador"
          />
        )}
        contentContainerStyle={[players.length === 0 && { flex: 1 }, {paddingBottom: 100}]}
        showsVerticalScrollIndicator={false}
      />
      }

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}