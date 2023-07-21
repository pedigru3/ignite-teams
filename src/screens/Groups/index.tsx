import { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';

import { useFocusEffect } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from 'src/@types/navigation';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { LoadIndicator } from '@components/loading/styles';

type GroupsProps = {
  navigation: NativeStackNavigationProp<RootParamList, 'groups'>
}

export function Groups({ navigation }: GroupsProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  function handleNewGroup(){
    navigation.navigate('new')
  }

  async function fetchGroups(){
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
      setIsLoading(false)
    } catch (error) {
      Alert.alert(
        'Turmas',
        'Ops! Não foi possível carregar as turmas.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate('players', { group })
  }

  useFocusEffect(
    useCallback(
      () => {
        fetchGroups()
      }, []
    )
  )

  return (
    <Container >
      <Header />
      <Highlight 
        title='Turmas' 
        subTitle='jogue com a sua turma'
      />
      {
        isLoading ? <LoadIndicator/> :
        <FlatList
        showsVerticalScrollIndicator={false}
        data={groups} 
        keyExtractor={item => item} 
        renderItem={({ item }) => (
          <GroupCard
            onPress={() => handleOpenGroup(item)}
            title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex:1 }}
        ListEmptyComponent={() => (
          <ListEmpty 
            message='Que tal cadastrar a primeira turma?'
          />
        )}
      />
      }
      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}

