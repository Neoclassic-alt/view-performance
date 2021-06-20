import React from 'react'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

export default function TableRow({item, length, colors}){
    let objectStyles = {
        width: Math.round((useWindowDimensions().width - 60) / length),
        height: 40
    }
    return (
        <View style={{flexDirection: 'row'}} key={item.id}>
            {item && item.marks.map((markItem, index) => 
                <View 
                    style={[{backgroundColor: colors[index]}, objectStyles]}
                    key={uuidv4()}
                ></View>
            )}
        </View>
    )
}