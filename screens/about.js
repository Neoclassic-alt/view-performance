import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../components/colors'
import * as Linking from 'expo-linking';

export default function About({navigation}){
    return (
      <View style={styles.container}>
        <SafeAreaView>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                style={styles.buttonGray}
                onPress={() => navigation.goBack()}
                >
                <Text style={{fontSize: 13}}>Вернуться назад</Text>
                </TouchableOpacity>
            </View>
            <Text style={{marginBottom: 10}}>Версия программы: 0.4</Text>
            <Text style={{marginBottom: 10}}>Разработал: Истигечев Борис</Text>
            <TouchableWithoutFeedback
                onPress={() => {
                    Linking.openURL('https://github.com/Neoclassic-alt/view-performance')
                }}
                ><Text style={[styles.link, {marginBottom: 10}]}>Проект на github</Text>
            </TouchableWithoutFeedback>
            <Text style={{marginBottom: 10}}>Изменения по сравнению с версией 0.3:</Text>
            <Text>•  Немного изменён дизайн приложения;</Text>
            <Text>•  Добавлены разделы «Помощь» и «О программе»;</Text>
            <Text>•  Добавлен новый вариант состояния лабораторной – «Пишу отчёт»;</Text>
            <Text>•  Изменена заставка приложения;</Text>
            <Text>•  Блок закрывается по нажатию на основную часть;</Text>
            <Text>•  Удаление истории стало доступно за сегодняшний день;</Text>
            <Text>•  Прочие мелкие изменения.</Text>
        </SafeAreaView>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      paddingVertical: 20,
      paddingHorizontal: 20
    },
    buttonGray: {
      borderWidth: 1,
      paddingHorizontal: 10,
      padding: 7,
      borderColor: colors.lightGray,
      marginBottom: 10,
    },
    link: {
        color: colors.blue,
        textDecorationLine: 'underline'
    }
  })