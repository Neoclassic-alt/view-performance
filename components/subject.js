import { observer } from 'mobx-react-lite'
import React from 'react'
import {StyleSheet, Text, View, useWindowDimensions, Pressable} from 'react-native'
import { Feather } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';

export const Subject = observer(({title, onMarkClicked, marks, labsState, id,
    editSubject, removeSubject}) => {

    const progress_style = {
        width: Math.round((useWindowDimensions().width - 60) / labsState.length - 10 ),
        height: 25
    }

    return (
        <View style={styles.subject}>
            <View style={styles.menu}>
                <Text style={styles.text}>{title}</Text>
                <Text></Text>
                <Pressable
                    onPress={() => null}
                    style={({pressed}) => ({
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                        borderRadius: 5
                    })}
                >
                    <ModalDropdown 
                        options={['Редактировать', 'Удалить']}
                        dropdownTextStyle={{fontSize: 14}}
                        adjustFrame={style => {
                            style.height = 81
                            return style
                        }}
                        onSelect={(_, value) => {
                            if (value == "Редактировать") {
                                editSubject()
                            }
                            if (value == "Удалить"){
                                removeSubject()
                            }
                        }}
                    >
                        <Feather name="more-horizontal" size={24} color="grey" />
                    </ModalDropdown>
                </Pressable>
            </View>
            <View style={styles.progressbar}>
                {labsState.map((item, index) => 
                    <Pressable 
                    onPress={() => {
                        onMarkClicked(id, index)
                    }}
                    style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? 'rgb(210, 230, 255)'
                            : 'white'
                        },
                        styles.wrapperCustom
                    ]}
                    key={index.toString()}
                    >
                        <View style={[{...marks.getMark(item).styles}, progress_style]}></View> 
                    </Pressable>
                )}
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    text: {
        fontSize: 18
    },
    progressbar: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10
    },
    wrapperCustom: {
        borderRadius: 2,
        padding: 4
    },
    subject: {
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        borderStyle: 'dashed'
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})