import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { colors } from '../components/colors'
import labs from './../stores/labs'
import historyStore from './../stores/history'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditSubjectForm({ route, navigation }){
  const [title, setTitle] = useState()
  const [numberOfLabs, setNumberOfLabs] = useState()

  let numbers = []
  for(let i = 1; i <= 12; i++){
      numbers.push(i)
  }

  const {subjectID} = route.params

  useEffect(() => {
    if (subjectID){
      const subject = labs.getSubject(subjectID)
      setTitle(subject?.title)
      setNumberOfLabs(subject?.marks.length)
      navigation.setOptions({title: 'Редактировать предмет'})
    }
  }, [])

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <Text style={styles.formLabel}>Название предмета:</Text>
      <TextInput
        onChangeText={setTitle}
        value={title}
        style={styles.textInput}
      />
      <Text style={styles.formLabel}>Количество лабораторных:</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={numberOfLabs}
          onValueChange={item => {
              setNumberOfLabs(item)
            }
          }
        >
        {numbers.map((index) => 
            <Picker.Item value={index} key={"numberOfLabs" + index} label={String(index)} />
        )}
        </Picker>
      </View>
      <View style={styles.buttonsRow}>
      {!subjectID && <TouchableOpacity // если цель - добавление предмета
        onPress={() => {
          labs.addSubject(title, numberOfLabs)
          historyStore.addHistory("addSubject", {
            newSubject: {
              title,
              countOfLabs: numberOfLabs
            }
          })
          navigation.navigate("EditTable")
        }}
        style={styles.mainButton}
      >
        <Text style={styles.mainButtonText}>Создать новый предмет</Text>
      </TouchableOpacity>}
      {subjectID && <TouchableOpacity // если цель - изменение предмета
        onPress={() => {
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
    width: 100,
    borderWidth: 1,
    marginBottom: 10
  },
  mainButton: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    flex: 3
  },
  mainButtonText: {
    fontWeight: "700",
    color: "white",
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
  buttonsRow: {
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
  }
})