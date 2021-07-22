import React from 'react'
import { observer } from 'mobx-react-lite';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default History = observer(({route}) => {
  const {history, labs, marks} = route.params

  return (
    <ScrollView style={styles.container}>
      {Object.entries(history.state).map(item => {
        const date = item[0]
        const historyOfDay = item[1]
        return (
          <View key={date}>
          <Text style={styles.titleDate}>{date}</Text>
          {historyOfDay.map(item => {
            if (item.action == "editLab"){
              let changes = item.changes
              return (
              <>
                <Text>{changes.position} лабораторная работа по предмету «{labs.getSubject(item.subjectID).title}»</Text>
                <View style={[styles.mark, marks.getMark(changes.from.markID).styles]}></View>
                <Text> → </Text>
                <View style={[styles.mark, marks.getMark(changes.to.markID).styles]}></View>
              </>
              )
            }
            if (item.action == "editSubject"){
              // TODO
            }
          })}
        </View>
      )
    })}
  </ScrollView>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  titleDate: {
    fontWeight: "bold",
    fontSize: 18
  },
  mark: {
    width: 20,
    height: 20
  }
})