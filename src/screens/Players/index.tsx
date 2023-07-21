import { Highlight } from "@components/Highlight";
import { Container, Form, NumberOfPlayers, RenderList } from "./styles";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState([])

  return (
    <Container>
      <Header showBackButton/>
      <Highlight
      title="Nome da Turma"
      subTitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          placeholder="Nome do participante"
          autoCorrect={false}
        />
        <ButtonIcon
          icon="add"
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

      <FlatList data={players}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemoved={() => console.log('removed')}
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

      <Button title="Remover turma" type="SECONDARY"/>
    </Container>
  )
}