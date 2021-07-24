import countBy from 'lodash.countby';
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import 'react-native-get-random-values';
import { Text as SvgText } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts';
import TableRow from "../components/table_row";

numbers = []
for(let i = 1; i <= 12; i++){
    numbers.push(i)
}

export default ViewTable = observer(({ route, navigation }) => {
    const {labs, marks} = route.params
    const [subjects, setSubjects] = useState()
    const [pieData, setPieData] = useState(labs.getVisibleSubjects())
    const [currentSemestr, setCurrentSemestr] = useState(labs.selectedSemestr)

    useEffect(() => {
        setCurrentSemestr(labs.selectedSemestr)
        setSubjects(labs.getVisibleSubjects())
        const marksInfo = marks.state.map(item => ({id: item.id, color: item.styles.backgroundColor}))
        const allMarks = subjects?.map(item => item.marks)
        .reduce((previous, marks) => previous.concat(marks), [])

        const infoOfMarks = countBy(allMarks)
        // обработка случая ""
        if (infoOfMarks[""]){
            infoOfMarks["2"] = infoOfMarks[""]
            delete infoOfMarks[""]
        }

        setPieData(Object.entries(infoOfMarks).map((item, index) => {
            const color = marksInfo.find((elem) => item[0] == elem.id).color
            return {
                value: item[1],
                svg: {
                    fill: color,
                    strokeWidth: "1",
                    stroke: "rgb(0,0,0)"
                },
                key: `pie-${index}`
            }
        }))
    }, [currentSemestr, labs.selectedSemestr, labs.changed])

    const Labels = ({ slices }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <SvgText
                    key={index}
                    x={pieCentroid[ 0 ]}
                    y={pieCentroid[ 1 ]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={36}
                    stroke={'black'}
                    strokeWidth={0.5}
                >
                    {data.value}
                </SvgText>
            )
        })
    }

    return (
        <View style={styles.container}>
            {subjects?.length ?
                <View>
                    <Text>Прогресс в {labs.selectedSemestr} семестре:</Text>
                    <View style={styles.table}>
                        {subjects.map((item, index) => 
                            <TableRow
                                item={item}
                                length={item.marks.length}
                                colors={item.marks.map((item) => marks.getMark(item).styles.backgroundColor)}
                                key={item.id}
                            />
                        )}
                    </View>
                    <Text style={{marginVertical: 10}}>Распределение лабораторных работ:</Text>
                    <PieChart
                        style={{height: 300}} 
                        data={pieData}
                        outerRadius={'95%'}
                        valueAccessor={({ item }) => item.value}
                        spacing={0}
                    >
                        <Labels />
                    </PieChart>
                </View> : <Text style={{fontSize: 16}}>Отсутствуют предметы для показа.</Text>
                }
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    table: {
        borderWidth: 1,
        marginTop: 10
    }
})