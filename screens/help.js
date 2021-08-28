import React from 'react'
import {View, ScrollView, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../components/colors'
import { useWindowDimensions } from 'react-native';
import marks from '../stores/marks';

export default function Help({navigation}){
  const {width: windowWidth} = useWindowDimensions()
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
        <ScrollView style={{marginBottom: 40}}>
          <Text style={{marginBottom: 10}}>Приложение <Text style={styles.bold}>LabView</Text> создано для учёта лабораторных работ. 
            Вы можете создавать предметы и редактировать лабораторные работы, 
            указывая для них следующие степени готовности:</Text>
          <Text style={{marginLeft: 10}}>• <Text style={[styles.bold, {color: marks.state[3].color}]}>Не готово</Text> (не приступали к данной лабораторной работе)</Text>
          <Text style={{marginLeft: 10}}>• <Text style={[styles.bold, {color: marks.state[2].color}]}>В процессе</Text> (лабораторная работа пишется в настоящий момент)</Text>
          <Text style={{marginLeft: 10}}>• <Text style={[styles.bold, {color: marks.state[1].color}]}>Пишу отчёт</Text> (лабораторная работа готова, но нужно написать отчёт)</Text>
          <Text style={{marginLeft: 10, marginBottom: 10}}>• <Text style={[styles.bold, {color: marks.state[0].color}]}>Готово</Text> (лабораторная работа полностью готова)
          </Text>
          <Text style={{marginBottom: 10}}>Сначала выберите семестр в выпадающем списке наверху. Для создания предмета нажмите кнопку <Image
            style={{
              width: 18,
              height: 18,
            }}
            source={require('../assets/help/plus.png')}
          /> в нижней части приложения. Вы можете указать непустое название и количество лабораторных (от 3 до 12). 
            Далее, раскрывая блок, изменяете состояние лабораторных (можно не по порядку).</Text>
          <Image
            style={[styles.centerImage, {width: windowWidth - 30, height: (windowWidth - 30)/417*93}]}
            source={require('../assets/help/not_expanded.png')}
          />
          <Text style={{textAlign: 'center', marginBottom: 10}}>Типичный блок предмета</Text>
          <Image
            style={[styles.centerImage, {width: windowWidth - 30, height: (windowWidth - 30)/420*336}]}
            source={require('../assets/help/expanded.png')}
          />
          <Text style={{textAlign: 'center', marginBottom: 10}}>Блок предмета раскрыт</Text>
          <Text style={{marginBottom: 10}}>Имеется возможность отнести предмет к <Text style={styles.italic}>избранным</Text>.
          Для этого нужно нажать на звезду. <Text style={styles.italic}>Избранный</Text> предмет поднимается на самый верх списка.
          Если все лабораторные в предмете отмечены как «готово», то предмет отмечается как <Text style={styles.italic}>выполненный</Text>.</Text>
          <Text>Все действия, производимые с предметами, отображаются в <Text style={styles.italic}>истории изменений</Text>, а именно: 
            изменение состояния лабораторной, добавление, редактирование и удаление предмета.
	Доступна очистка истории: за день и за всё время.</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  text: {
    fontSize: 14
  },
  buttonGray: {
    borderWidth: 1,
    paddingHorizontal: 10,
    padding: 7,
    borderColor: colors.lightGray,
    marginBottom: 10,
  },
  bold: {
    fontWeight: '700'
  },
  italic: {
    fontStyle: 'italic'
  },
  centerImage: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginBottom: 4
  }
})