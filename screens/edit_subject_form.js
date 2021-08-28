import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { colors } from '../components/colors'
import labs from './../stores/labs'
import historyStore from './../stores/history'
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

export default function EditSubjectForm({ route, navigation }){
  const [title, setTitle] = useState()
  const [numberOfLabs, setNumberOfLabs] = useState(3)
  const [isNameError, setNameError] = useState(false)

  const {subjectID} = route.params

  useEffect(() => {
    if (subjectID){
      const subject = labs.getSubject(subjectID)
      setTitle(subject?.title)
      setNumberOfLabs(subject?.marks.length)
    }
  }, [])

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <Text style={styles.formLabel}>Название предмета:</Text>
      <View style={{marginBottom: 10}}>
        <TextInput
          onChangeText={(title) => {
              setNameError(false)
              setTitle(title)
            }
          }
          value={title}
          style={[styles.textInput, isNameError ? styles.nameError : {}]}
        />
        <Text style={{color: colors.red, display: isNameError ? 'flex' : 'none'}}>Название предмета не может быть пустым</Text>
      </View>
      <Text style={styles.formLabel}>Количество лабораторных:</Text>
      <View style={styles.row}>
        <Slider
            minimumValue={3}
            maximumValue={12}
            minimumTrackTintColor={colors.blue}
            maximumTrackTintColor={colors.lightGray}
            style={{marginRight: 10, marginBottom: 10, flex: 1}}
            onValueChange={setNumberOfLabs}
            step={1}
            value={numberOfLabs}
        />
        <Text>{numberOfLabs}</Text>
      </View>
      <View style={styles.row}>
      {!subjectID && <TouchableOpacity // если цель - добавление предмета
        onPress={() => {
          if (title){
            labs.addSubject(title, numberOfLabs)
            historyStore.addHistory("addSubject", {
              newSubject: {
                title,
                countOfLabs: numberOfLabs
              }
            })
            navigation.navigate("EditTable")
          } else {
            setNameError(true)
          }
        }}
        style={styles.mainButton}
      >
        <Text style={styles.mainButtonText}>Создать предмет</Text>
      </TouchableOpacity>}
      {subjectID && <TouchableOpacity // если цель - изменение предмета
        onPress={() => {
          if (title) {
            const {title: prevTitle, marks} = labs.getSubject(subjectID)
            labs.editSubject(subjectID, title, numberOfLabs)
            historyStore.addHistory("editSubject", {
              subjectID,
              changes: {
                from: {
                  title: prevTitle,
                  countOfLabs: marks.length
                },
                to: {
                  title,
                  countOfLabs: numberOfLabs
                }
              }
            })
            navigation.navigate("EditTable")
          } else {
            setNameError(true)
          }
        }}
        style={styles.mainButton}
      >
        <Text style={styles.mainButtonText}>Изменить предмет</Text>
      </TouchableOpacity>}
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('EditTable')}>
        <Text style={styles.cancelButtonText}>Отмена</Text>
      </TouchableOpacity>
      </View>
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
  picker: {
    color: colors.blue,
    marginBottom: 10,
  },
  mainButton: {
    borderColor: colors.blue,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    flex: 3
  },
  mainButtonText: {
    color: colors.blue,
    textAlign: 'center',
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    marginBottom: 8,
    paddingLeft: 10,
    paddingVertical: 7
  },
  formLabel: {
    marginBottom: 8,
    fontSize: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cancelButton: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1
  },
  cancelButtonText: {
    color: colors.blue,
  },
  nameError: {
    borderWidth: 1, 
    borderColor: colors.red
  }
})