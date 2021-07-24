import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal, ModalButton, ModalContent, ModalFooter, ModalPortal, ModalTitle } from 'react-native-modals';
import { colors } from '../components/colors';
import LegendModal from '../components/modals/legend_modal';
import { Subject } from '../components/subject';
import { createStackNavigator } from '@react-navigation/stack';
import { EditSubjectForm } from './edit_subject_form';

const Stack = createStackNavigator()

export default function EditTable({route}){
    const {marks, labs, historyStore} = route.params
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="EditTableView"
                component={EditTableView}
                initialParams={{ marks, labs, historyStore }}
                options={{title: 'Редактировать лабораторные'}}
            />
            <Stack.Screen
                name="EditSubjectForm"
                component={EditSubjectForm}
                initialParams={{ labs }}
                options={{title: 'Добавить предмет'}}
            />
        </Stack.Navigator>
    )
}

export const EditTableView = observer(({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [legendVisible, setLegendVisible] = useState(false)
    const [currentIndex, setCurrentIndex] = useState()
    const [currentMarkID, setCurrentMarkID] = useState()
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [currentSubjectID, setCurrentSubjectID] = useState(null)

    const {marks, labs, historyStore} = route.params

    numbers = []
    for(let i = 1; i <= 12; i++){
        numbers.push(i)
    }

    function markClicked(markID){
        setModalVisible(false)
        const prevMarkID = labs.getSubject(currentSubjectID).marks[currentIndex]
        labs.addMarkToLab(currentSubjectID, currentIndex, markID)
        labs.setChanged()
        historyStore.addHistory("editLab", {
            subjectID: currentSubjectID,
            changes: {
                position: currentIndex + 1,
                from: {
                    markID: prevMarkID
                },
                to: {
                    markID
                }
            }
        })
    }

    function setMarkInSubject(id, index){
        setModalVisible(true)
        setCurrentSubjectID(id)
        setCurrentIndex(index)
        setCurrentMarkID(labs.getSubject(id).marks[index] || "2")
    }

    return (
        <View style={styles.container}>
            <Modal // модальное окно меток
                visible={modalVisible}
                onTouchOutside={() => {
                    setModalVisible(false)
                }}
                modalTitle={
                    <ModalTitle
                      title="Поставить метку"
                      align="left"
                    />
                }
                footer={
                    <ModalFooter>
                        <ModalButton
                            text="Закрыть"
                            bordered
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            key="button-1"
                        />
                    </ModalFooter>
                }
            >
                <ModalContent style={{marginTop: 20}}>
                    {marks.state.filter(item => item.id != currentMarkID).map((item) => (
                        <Pressable
                            onPress={() => markClicked(item.id)}
                            style={({pressed}) => [{backgroundColor: pressed ? 'brown' : 'white'}]}
                            key={item.id}
                        >
                            <Text style={styles.markText}>{item.title}</Text>
                        </Pressable>
                        )
                    )}
                </ModalContent>
            </Modal>
            <Modal // модальное окно подтверждения удаления
                visible={deleteModalVisible}
                onTouchOutside={() => {
                    setDeleteModalVisible(false)
                }}
                footer={
                    <ModalFooter>
                        <ModalButton
                            text="Да"
                            onPress={() => {
                                labs.removeSubject(currentSubjectID)
                                historyStore.addHistory("deleteSubject", {
                                    deletedSubject: {
                                        title: labs.getSubject(currentSubjectID).title
                                    }
                                })
                                setDeleteModalVisible(false)
                            }}
                            key="button-1"
                        />
                        <ModalButton
                            text="Нет"
                            onPress={() => setDeleteModalVisible(false)}
                            key="button-2"
                        />
                    </ModalFooter>
                }
            >
                <ModalContent style={{marginTop: 20}}>
                    <Text>Вы точно хотите удалить предмет?</Text>
                </ModalContent>
            </Modal>
            <Picker
                style={styles.picker}
                selectedValue={labs.selectedSemestr}
                onValueChange={(item) => {
                        labs.setSemestr(item)
                    }
                }
            >
                {numbers.map((index) => 
                    <Picker.Item value={index} key={"semestr" + index} label={index + " семестр "} />
                )}
            </Picker>
            <TouchableOpacity
                onPress={() => setLegendVisible(true)}
                style={styles.legendShowButton}
            >
                <Text style={styles.legendShowText}>Отобразить легенду</Text>
            </TouchableOpacity>
            <LegendModal
                legendVisible={legendVisible}
                setLegendVisible={setLegendVisible}
                marks={toJS(marks.state)} // https://mobx.js.org/react-integration.html#dont-pass-observables-into-components-that-arent-observer
            />
            <ScrollView>
                {labs.getVisibleSubjects().map((item, index) =>
                    <Subject
                        title={item.title}
                        onMarkClicked={setMarkInSubject}
                        labsState={item.marks}
                        marks={marks}
                        key={`Semestr ${labs.selectedSemestr}, Subject ${index}`}
                        editSubject={() => navigation.navigate('EditSubjectForm', {labs, historyStore, subjectID: item.id})}
                        removeSubject={() => {
                            setDeleteModalVisible(true)
                            setCurrentSubjectID(item.id)
                        }}
                        id={item.id}
                    />
                )}
            </ScrollView>
            <TouchableOpacity
                onPress={() => navigation.navigate('EditSubjectForm', { labs, historyStore })}
                style={styles.buttonAddSubject}
            >
                <Text style={styles.buttonAddSubjectText}><Ionicons name="add" size={18} color={colors.blue} /> Создать новый предмет</Text>
            </TouchableOpacity>
            <StatusBar hidden />
            <ModalPortal />
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    picker: {
        color: colors.blue,
        width: 170,
        right: 8
    },
    wrapperCustom: {
        borderRadius: 2,
        padding: 4
    },
    markText: {
        fontSize: 18,
        marginVertical: 10
    },
    legendShowText: {
        color: colors.red,
        paddingVertical: 5,
        fontSize: 18
    },
    legendShowButton: {
        borderWidth: 0,
        borderColor: colors.red,
        width: 200,
    },
    buttonAddSubject: {
        borderWidth: 1,
        borderColor: colors.blue,
        borderWidth: 1
    },
    buttonAddSubjectText: {
        color: colors.blue,
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 10
    }
})