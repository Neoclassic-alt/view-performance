import React from 'react'
import { observer } from 'mobx-react-lite';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../components/colors';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

export default History = observer(({route}) => {
  const {historyStore: history, labs, marks} = route.params

  return (
    <View style={styles.container}>
    <ScrollView>
      {history.state && Object.entries(history.state).reverse().map(dateInfo => {
        const [date, historyOfDay] = dateInfo
        return (
          <View key={date} style={styles.historyRound}>
          <Text style={styles.titleDate}>{date}</Text>
            {historyOfDay.map(item => {
              const {changes, action, id} = item
              if (action == "editLab"){
                return (
                <View style={[styles.historyBlock, styles.historyAction]} key={id}>
                  <Text style={{maxWidth: "80%"}}>Изменена {changes.position} лабораторная работа по предмету 
                  «<Text style={styles.bold}>{labs.getSubject(item.subjectID).title}</Text>»</Text>
                  <View style={[styles.mark, {...marks.getMark(changes.from.markID).styles}]}></View>
                  <Text> → </Text>
                  <View style={[styles.mark, {...marks.getMark(changes.to.markID).styles}]}></View>
                </View>
                )
              }
              if (action == "editSubject"){
                return (
                  <Text 
                    key={id}
                    style={styles.historyAction}
                  >Изменено название предмета «<Text style={styles.bold}>{changes.from.title}</Text>» 
                  на «<Text style={styles.bold}>{changes.to.title}</Text>» 
                  {changes.to.countOfLabs ? `, а также количество лабораторных работ с ${changes.from.countOfLabs} на ${changes.to.countOfLabs}` : ""}</Text>
                )
              }
              if (action == "addSubject"){
                return (
                  <Text key={id} style={styles.historyAction}>Добавлен предмет «<Text style={styles.bold}>{item.newSubject.title}</Text>»</Text>
                )
              }
              if (action == "deleteSubject"){
                return (
                  <Text key={id} style={styles.historyAction}>Удалён предмет «<Text style={styles.bold}>{item.deletedSubject.title}</Text>»</Text>
                )
              }
            })}
        </View>
      )
    })}
  </ScrollView>
  <View style={styles.historyActionsAround}>
    <Text>Действия: </Text>
    <View style={styles.historyButtons}>
      <TouchableOpacity>
        <Text style={styles.dateRangeButtonText}><MaterialIcons name="date-range" size={24} color={colors.gray} /></Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.saveHistoryButtonText}><AntDesign name="download" size={24} color={colors.blue} /></Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.clearHistoryButtonText}><AntDesign name="delete" size={24} color={colors.red}/></Text>
      </TouchableOpacity>
    </View>
  </View>
  </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titleDate: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5
  },
  mark: {
    width: 20,
    height: 20,
  },
  historyBlock: {
    flexDirection: "row",
  },
  bold: {
    fontWeight: "700"
  },
  historyRound: {
    borderWidth: 1,
    borderColor: colors.blue,
    marginBottom: 10,
    padding: 10
  },
  historyAction: {
    marginBottom: 5
  },
  historyActionsAround: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  historyButtons: {
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  saveHistoryButtonText: {
    marginLeft: 20
  },
  clearHistoryButtonText: {
    marginLeft: 20
  }
})