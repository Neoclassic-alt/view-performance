import React from 'react';
import { ModalContent, ModalTitle, BottomModal} from 'react-native-modals'
import { Text, View, StyleSheet } from 'react-native';

export default function({legendVisible, setLegendVisible, marks}){
    return (
        <BottomModal
            visible={legendVisible}
            onTouchOutside={() => {
                setLegendVisible(false)
            }}
            modalTitle={
                <ModalTitle
                    title="Легенда"
                    align="left"
                />
            }
        >
            <ModalContent style={{marginTop: 20}}>
                {marks.map((item) => 
                    <View style={styles.legend} key={item.id}>
                        <View style={[styles.legendIcon, item.styles]}></View><Text style={styles.legendText}>{item.title}</Text>
                    </View>
                )}
            </ModalContent>
        </BottomModal>
    )
}

const styles = StyleSheet.create({
    legend: {
        flexDirection: 'row',
    },
    legendIcon: {
        width: 10,
        height: 10,
        marginTop: 7,
        marginRight: 10
    },
    legendText: {
        fontSize: 16
    }
})