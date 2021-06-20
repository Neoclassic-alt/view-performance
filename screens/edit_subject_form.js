import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { colors } from '../components/colors'

export function EditSubjectForm({ route, navigation }){
  const [title, setTitle] = useState()
  const [numberOfLabs, setNumberOfLabs] = useState()

  let numbers = []
  for(let i = 1; i <= 12; i++){
      numbers.push(i)
  }

  let {labs, subjectID} = route.params

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
      {!subjectID && <TouchableOpacity // если цель - добавление предмета
        onPress={() => {
          labs.addSubject(title, numberOfLabs)
          navigation.navigate("EditTableView")
        }}
        style={styles.mainButton}
      >
        <Text style={styles.mainButtonText}>Создать новый предмет</Text>
      </TouchableOpacity>}
      {subjectID && <TouchableOpacity // если цель - изменение предмета
        onPress={() => {
          labs.editSubject(subjectID, title, numberOfLabs)
          navigation.navigate("EditTableView")
        }}
        style={styles.mainButton}
      >
        <Text style={styles.mainButtonText}>Изменить предмет</Text>
      </TouchableOpacity>}
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
    paddingVertical: 10
  },
  mainButtonText: {
    fontWeight: "700",
    color: "white",
    textAlign: 'center',
    fontSize: 20,
  },
  textInput: {
    borderWidth: 1,
    marginBottom: 8
  },
  formLabel: {
    marginBottom: 8,
    fontSize: 16
  }
})