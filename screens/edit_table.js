import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Modal, ModalButton, ModalContent, ModalFooter, ModalPortal } from 'react-native-modals';
import { colors } from '../components/colors';
import { Subject } from '../components/subject';
import labs from './../stores/labs'
import historyStore from './../stores/history'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default EditTable = observer(({ route, navigation }) => {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [currentSubjectID, setCurrentSubjectID] = useState(null)

    return (
        <View style={styles.container}>
            <SafeAreaView>
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
                                    subjectID: currentSubjectID,
                                    deletedSubjectTitle: labs.getSubject(currentSubjectID).title
                                })
                                setDeleteModalVisible(false)
                            }}
                            key="button-yes"
                        />
                        <ModalButton
                            text="Нет"
                            onPress={() => setDeleteModalVisible(false)}
                            key="button-no"
                        />
                    </ModalFooter>
                }
            >
                <ModalContent style={{marginTop: 20}}>
                    <Text>Вы точно хотите удалить предмет?</Text>
                </ModalContent>
            </Modal>
            <View style={styles.header}>
                {labs.selectedSemestr && <ModalDropdown 
                    options={Array(12).fill().map((_, index) => index + 1 + " семестр")}
                    dropdownTextStyle={{fontSize: 14}}
                    adjustFrame={style => {
                        style.width = 100,
                        style.height = 200
                        return style
                    }}
                    defaultValue={labs.selectedSemestr + " семестр      ▼"}
                    onSelect={index => {
                        labs.setSemestr(index + 1)
                    }}
                    renderButtonText={text => text + "      ▼"}
                    style={styles.semestrDropDown}
                ></ModalDropdown>}
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity 
                        style={[styles.buttonGray, styles.rightBorder]}
                        onPress={() => navigation.navigate('History')}
                    >
                        <Text>История изменений</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonGray}
                        onPress={() => null}
                    >
                        <ModalDropdown 
                            options={['Помощь', 'О программе']}
                            dropdownTextStyle={{fontSize: 14}}
                            adjustFrame={style => {
                                style.width = 120,
                                style.height = 85
                                return style
                            }}
                        >
                            <Text><Feather name="more-horizontal" size={24} color="black" /></Text>
                        </ModalDropdown>
                    </TouchableOpacity>
                </View>
            </View>
            {labs.getVisibleSubjects().length ? <ScrollView style={{marginBottom: 20}}>
            { // сначала избранные
            labs.getVisibleSubjects().filter(lab => lab.favorite && !lab.marks.every(value => value == 1)).map(item =>
                <Subject
                    title={item.title}
                    labsState={item.marks}
                    key={item.id}
                    editSubject={() => navigation.navigate('EditSubjectForm', {labs, historyStore, subjectID: item.id})}
                    removeSubject={() => {
                        setDeleteModalVisible(true)
                        setCurrentSubjectID(item.id)
                    }}
                    favorite={true}
                    fulfilled={false}
                    id={item.id}
                />
            )}
            {labs.getVisibleSubjects().filter(lab => !lab.favorite && !lab.marks.every(value => value == 1)).map(item =>
                <Subject
                    title={item.title}
                    labsState={item.marks}
                    key={item.id}
                    editSubject={() => navigation.navigate('EditSubjectForm', {labs, historyStore, subjectID: item.id})}
                    removeSubject={() => {
                        setDeleteModalVisible(true)
                        setCurrentSubjectID(item.id)
                    }}
                    favorite={false}
                    fulfilled={false}
                    id={item.id}
                />
            )}
            {labs.getVisibleSubjects().some(lab => lab.marks.every(value => value == 1)) && <Text style={styles.fulfilledTitle}>Выполненные предметы</Text>}
            {labs.getVisibleSubjects().filter(lab => lab.marks.every(value => value == 1)).map(item =>
                <Subject
                    title={item.title}
                    labsState={item.marks}
                    key={item.id}
                    editSubject={() => navigation.navigate('EditSubjectForm', {labs, historyStore, subjectID: item.id})}
                    removeSubject={() => {
                        setDeleteModalVisible(true)
                        setCurrentSubjectID(item.id)
                    }}
                    favorite={false}
                    fulfilled={true}
                    id={item.id}
                />
            )}
            </ScrollView> : <Text></Text>}
            </SafeAreaView>
            <StatusBar />
            <ModalPortal />
            <TouchableOpacity
                onPress={() => navigation.navigate('EditSubjectForm', { labs, historyStore })}
                style={[styles.buttonAddSubject, {top: useWindowDimensions().height - 100}]}
            >
                <Text style={styles.buttonAddSubjectText}>+</Text>
            </TouchableOpacity>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    header: {
        paddingVertical: 6,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    semestrDropDown: {
        alignSelf: 'center',
        padding: 8,
        backgroundColor: '#fff'
    },
    buttonGray: {
        paddingHorizontal: 10,
        padding: 5,
        backgroundColor: '#fff'
    },
    rightBorder: {
        borderRightWidth: 1,
        borderRightColor: colors.backgroundGray
    },
    wrapperCustom: {
        borderRadius: 2,
        padding: 4
    },
    buttonAddSubject: {
        position: 'absolute',
        right: 20,
        backgroundColor: colors.blue,
        borderRadius: 100,
        alignSelf: 'flex-end',
        width: 75,
        height: 75,
        justifyContent: 'center',
    },
    buttonAddSubjectText: {
        color: colors.backgroundGray,
        fontSize: 48,
        textAlign: 'center',
    },
    fulfilledTitle: {
        fontSize: 20,
        marginTop: 15,
        marginBottom: 5
    }
})