import React from 'react'
import { observer } from 'mobx-react-lite';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default History = observer(({route}) => {
    const {history} = route.params

    return (
        <ScrollView style={styles.container}>
            {Object.entries(history.state).map(item => {
                const date = item[0]
                const historyOfDay = item[1]
                return (
                    <View key={date}>
                        <Text style={styles.titleDate}>{date}</Text>
                        {historyOfDay.map(item => {
                            
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
    }
})