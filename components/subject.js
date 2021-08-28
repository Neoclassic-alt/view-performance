import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { colors } from './colors';
import labs from './../stores/labs'
import marks from './../stores/marks'
import history from './../stores/history'

export const Subject = observer(({title, favorite, fulfilled, labsState, id,
    editSubject, removeSubject}) => {
    
    const [isOpened, setOpened] = useState(false)

    return (
        <View style={styles.subjectShadow} key={id}>
            <View style={[styles.subject, fulfilled ? styles.fulfilledSubject : styles.commonSubject]}>
                <Pressable style={styles.outer} onPress={() => setOpened(!isOpened)}>
                    <View style={styles.menu}>
                        <Text style={{fontSize: 20, flexShrink: 1}}>{title}</Text>
                        {!fulfilled && <Pressable onPress={() => {labs.setFavorite(id)}} style={{marginLeft: 10}}>
                            <Text><Entypo name="star" size={18} color={favorite ? colors.orange : colors.lightGray} /></Text>
                        </Pressable>}
                        {fulfilled && <Text>
                            <FontAwesome5 name="check-circle" size={20} color={colors.green}/>
                            <Text style={{fontSize: 20}}> {labsState.filter(markID => markID == 1).length}/{labsState.length}</Text>
                        </Text>}
                    </View>
                    <View style={[styles.progress]}>
                        <View style={[{display: fulfilled ? 'none' : 'flex'}, styles.progressbar]}>
                            {!fulfilled && labsState.map((item, index) => {
                                const markColor = marks.getMark(item).color
                                return (
                                    <View style={styles.progress_style} key={String(index)}>
                                        <View style={[styles.triangle, {
                                            borderBottomColor: markColor,
                                            borderRightColor: markColor,
                                            borderLeftColor: "white", 
                                            borderTopColor: "white",
                                        }]}></View>
                                        <View style={{backgroundColor: markColor, flex: 1}}><Text style={{color: "white"}}>.</Text></View>
                                        <View style={[styles.triangle, {
                                            borderBottomColor: "white",
                                            borderRightColor: "white",
                                            borderLeftColor: markColor,
                                            borderTopColor: markColor,
                                            position: "relative",
                                            right: 1
                                        }]}></View>
                                    </View>
                                )
                            })}
                        </View>
                        {!fulfilled && <View>
                            <Text>
                                <FontAwesome5 name="check-circle" size={20} color={colors.green}/>
                                <Text style={{fontSize: 20}}> {labsState.filter(markID => markID == 1).length}/{labsState.length}</Text>
                            </Text>
                        </View>}
                    </View>
                    {!fulfilled && <View style={{display: isOpened ? 'none' : 'flex', alignItems: 'center'}}>
                        <Text><MaterialIcons name="expand-more" size={18} color={colors.lightGray}/></Text>
                    </View>}
                    {isOpened && <View style={{alignItems: 'center'}}>
                        <Text><MaterialIcons name="expand-less" size={18} color={colors.lightGray}/></Text>
                    </View>}
                </Pressable>
                <View style={{display: isOpened ? 'flex' : 'none'}}>
                    <Text style={{marginVertical: 10}}>Статус лабораторных:</Text>
                    {labsState.map((item, index) => (
                        <View key={String(index)} style={styles.labState}>
                            <Text>Лабораторная №{index + 1}</Text>
                            <ModalDropdown
                                options={marks.state.map(mark => mark.id)}
                                dropdownTextStyle={{fontSize: 14}}
                                defaultValue={marks.getMark(item).title + " ".repeat(38 - marks.getMark(item).title.length*2) + "▼"}
                                style={[styles.labDropdown, {borderColor: marks.getMark(item).color}]}
                                adjustFrame={style => {
                                    style.width = 120
                                    style.height = Math.min(marks.state.length*40 + 8, 208)
                                    return style
                                }}
                                onSelect={(_, markID) => {
                                    if (labsState[index] != markID){
                                        history.addHistory('editLab', {
                                            subjectID: id,
                                            changes: {
                                                position: index + 1,
                                                fromMarkID: labsState[index],
                                                toMarkID: markID
                                            }
                                        })
                                        labs.addMarkToLab(id, index, markID)
                                    }
                                }}
                                renderButtonText={id => {
                                    const title = marks.getMark(id).title
                                    return title + " ".repeat(38 - title.length*2) + "▼"
                                }}
                                renderRow={id => <Text style={styles.dropdownText}>{marks.getMark(id).title}</Text>}
                                renderSeparator={() => null}
                            />
                        </View>
                    ))}
                    <View style={styles.systemButtons}>
                        <TouchableOpacity
                            onPress={() => editSubject()}
                            style={styles.buttonEditSubject}
                        >
                            <Text style={styles.buttonEditSubjectText}>Редактировать</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => removeSubject()}
                            style={styles.buttonDeleteSubject}
                        >
                            <Text style={styles.buttonDeleteSubjectText}>Удалить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    subjectShadow: {
        borderBottomWidth: 0,
        borderBottomColor: "#F5F5F5",
        borderRightWidth: 0,
        borderRightColor: "#F5F5F5",
        marginVertical: 5,
    },
    subject: {
        padding: 10,
        paddingBottom: 10,
        borderWidth: 1,
        backgroundColor: '#fff'
    },
    commonSubject: {
        borderWidth: 0
    },
    fulfilledSubject: {
        borderColor: colors.green,
        backgroundColor: '#F4FDF6'
    },
    progress: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 2
    },
    progressbar: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 12,
        marginRight: 10,
        flex: 1
    },
    progress_style: {
        minWidth: 10,
        height: 8,
        flex: 1,
        flexDirection: "row"
    },
    triangle: {
        width: 0,
        height: 0,
        borderWidth: 4,
    },
    wrapperCustom: {
        borderRadius: 2,
        padding: 4
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labState: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 7,
        fontSize: 14
    },
    labDropdown: {
        borderWidth: 1,
        minWidth: 140,
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 14
    },
    dropdownText: {
        marginVertical: 10, 
        marginLeft: 10, color: 
        colors.gray
    },
    systemButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10
    },
    buttonEditSubject: {
        borderWidth: 1,
        borderColor: colors.blue,
        paddingVertical: 7,
        paddingHorizontal: 16,
        marginRight: 16,
    },
    buttonEditSubjectText: {
        color: colors.blue
    },
    buttonDeleteSubject: {
        borderWidth: 1,
        borderColor: colors.red,
        paddingVertical: 7,
        paddingHorizontal: 16,
    },
    buttonDeleteSubjectText: {
        color: colors.red
    },
})