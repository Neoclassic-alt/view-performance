import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import { ViewTable } from './screens/view_table';
import { EditTable } from './screens/edit_table';

import marks from './stores/marks'
import labs from './stores/labs'
import historyStore from './stores/history'
import { colors } from './components/colors';

const Tab = createBottomTabNavigator();

/* найти нормальные иконки для навигации
// для истории
import { MaterialCommunityIcons } from '@expo/vector-icons';
<MaterialCommunityIcons name="history" size={24} color="black" />
// для статистики
<AntDesign name="areachart" size={24} color="black" />
// для оценок / марок
import { Ionicons } from '@expo/vector-icons';
<Ionicons name="bookmarks-outline" size={24} color="black" />
*/

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      initialRouteName="EditTable"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name == "EditTable"){
            return <AntDesign name="edit" size={size} color={color} />;
          }
          if (route.name == "ViewTable"){
            return <AntDesign name="table" size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.blue,
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen 
          name="EditTable" 
          component={EditTable} 
          initialParams={{ marks, labs, historyStore }}
          options={{title: 'Редактировать'}}
        />
        <Tab.Screen 
          name="ViewTable" 
          component={ViewTable} 
          initialParams={{ marks, labs }}
          options={{title: 'Просмотр'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  text: {
    color: '#fff'
  },
});
