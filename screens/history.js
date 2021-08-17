import React, {useState} from 'react'
import { observer } from 'mobx-react-lite';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, ModalButton, ModalContent, ModalFooter, ModalPortal } from 'react-native-modals';
import { colors } from '../components/colors';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import labs from './../stores/labs'
import marks from './../stores/marks'
import history from '../stores/history';
import { SafeAreaView } from 'react-native-safe-area-context';

export default History = observer(({navigation}) => {

  const [isModalVisible, setModalVisible] = useState(false)
  const [countHistoryPages, setCountHistoryPages] = useState(1) // сколько раз нажата кнопка "просмотреть больше"
  const [historyPageSize, setHistoryPageSize] = useState(20) // количество дней, показываемых за раз. Можно выбрать: 10, 20, 50 или 100

  return (
    <View style={styles.container}>
      <Modal // модальное окно подтверждения удаления
        visible={isModalVisible}
        onTouchOutside={() => {
          setModalVisible(false)
        }}
        footer={
          <ModalFooter>
            <ModalButton
              text="Очистить"
              onPress={() => {
                history.clearHistory()
                setModalVisible(false)
              }}
              key="button-yes"
            />
            <ModalButton
              text="Отмена"
              onPress={() => setModalVisible(false)}
              key="button-no"
            />
          </ModalFooter>
        }
      >
          <ModalContent style={{marginTop: 20}}>
              <Text>Вы уверены? Вся история изменений будет безвозвратно удалена!</Text>
          </ModalContent>
      </Modal>
      <SafeAreaView>
      <View style={styles.historyButtonsTop}>
        <TouchableOpacity 
            style={styles.buttonGray}
            onPress={() => navigation.navigate('EditTable')}
        >
            <Text style={{fontSize: 13}}>Вернуться к редактированию таблицы</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.clearHistoryButtonText}><MaterialIcons name="delete" size={24} color={colors.lightGray} /></Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginTop: 20}}>
        {history.state.length ? history.state.slice().reverse().map(dateInfo => {
          const {date, actions} = dateInfo
          return (
            <View key={date} style={styles.historyRound}>
            <Text style={styles.titleDate}>{date}</Text>
              {actions.slice().reverse().map(item => {
                const {changes, action, subjectID, id} = item
                if (action == "editLab"){
                  return (
                  <View style={[styles.historyBlock, styles.historyAction]} key={id}>
                    <Text style={{flexShrink: 1}}>Изменена {changes.position} лабораторная работа по предмету
                    «<Text style={styles.bold}>{labs.getSubject(subjectID).title}</Text>»</Text>
                    <View style={styles.labsChange}>
                      <View style={[styles.mark, {backgroundColor: marks.getMark(changes.fromMarkID).color}]}></View>
                      <Text style={{position: 'relative', bottom: 2}}> → </Text>
                      <View style={[styles.mark, {backgroundColor: marks.getMark(changes.toMarkID).color}]}></View>
                    </View>
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
                    {changes.from.countOfLabs != changes.to.countOfLabs ? 
                    `и количество лабораторных работ с ${changes.from.countOfLabs} на ${changes.to.countOfLabs}` : ""}</Text>
                  )
                }
                if (action == "addSubject"){
                  return (
                    <Text key={id} style={styles.historyAction}>Добавлен предмет «<Text style={styles.bold}>{item.newSubject.title}</Text>»</Text>
                  )
                }
                if (action == "deleteSubject"){
                  return (
                    <Text key={id} style={styles.historyAction}>Удалён предмет «<Text style={styles.bold}>{item.deletedSubjectTitle}</Text>»</Text>
                  )
                }
              })}
          </View>
        )
      }) : <Text>История пуста</Text>}
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
    </SafeAreaView>
    <ModalPortal />
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
  buttonGray: {
    borderWidth: 1,
    paddingHorizontal: 10,
    padding: 7,
    borderColor: colors.lightGray,
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
  labsChange: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 10
  },
  bold: {
    fontWeight: "700"
  },
  historyRound: {
    marginBottom: 10,
    paddingRight: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  historyAction: {
    marginBottom: 5,
  },
  historyActionsAround: {
    flexDirection: "row",
    justifyContent: "space-between",
    display: "none"
  },
  historyButtons: {
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  saveHistoryButtonText: {
    marginLeft: 20
  },
  clearHistoryButtonText: {
    marginLeft: 20,
  },
  historyButtonsTop: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})