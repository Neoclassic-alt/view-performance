import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditTable from './screens/edit_table';
import EditSubjectForm from './screens/edit_subject_form';
import History from './screens/history';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EditTable">
        <Stack.Screen
          name="EditTable"
          component={EditTable} 
          options={{title: 'Редактировать', headerShown: false}}
        />
        <Stack.Screen 
          name="EditSubjectForm" 
          component={EditSubjectForm} 
          options={{title: 'Редактировать предмет', headerShown: false}}
        />
        <Stack.Screen 
          name="History" 
          component={History} 
          options={{title: 'История', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}