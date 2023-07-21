import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Groups } from '@screens/Groups'
import { NewGroup } from '@screens/NewGroup'
import { Players } from '@screens/Players'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes(){
  return (
    <Navigator 
      screenOptions={{ 
        headerShown:false, 
        animation: 'fade_from_bottom' 
      }}
    >
      <Screen
        name='groups'
        component={Groups}
      />
      <Screen
        name='new'
        component={NewGroup}
      />
      <Screen
        options={{ animation: 'slide_from_right' }}
        name='players'
        component={Players}
      />
    </Navigator>
  )
}