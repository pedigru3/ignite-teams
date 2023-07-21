import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Container, Content, Icon } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useState } from 'react'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { Alert } from 'react-native'

export function NewGroup(){
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  async function handleNewGroup(){
    if (group.trim().length < 3){
      return Alert.alert('Novo Grupo', 'Digite um nome válido!')
    }
    try {
      await groupCreate(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Ops. Algo de errado aconteceu.')
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton/>
      <Content>
        <Icon />
        <Highlight title='Nova turma' 
        subTitle='crie a turma para adicionar as pessoas' 
        />
        <Input
          placeholder='Nome da turma'
          onChangeText={setGroup}
        />
        <Button
          title='Criar'
          style={{marginTop: 20}}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  )
}