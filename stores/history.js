import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

class History {
    /* Модель данных:
    state = {
        // * означает возможность присвоения null
        "13.06.2021": [ // дата внесения изменений // string
            {
                action: "editLab" // действия: "editLab" (редактирование лабораторной работы),
                // "editSubject" (редактирование предмета),
                // "addSubject" (добавление предмета),
                // "removeSubject" (удаление предмета) // string
                changes: { // какие изменения были внесены
                    position: null // number*
                    from: {
                        markID: "52545345" // string*
                        title: "ПрПРРПР" // string*
                        countOfLabs: 5 // number*
                    }
                    to: {
                        markID: "364363" // string*
                        title: "аахш" // string*
                        countOfLabs: 7 // number*
                    }
                }
            }
        ]
    }
    */
   state = {
       "13 июня 2021": [
           {
                id: "525453453",
                action: "editLab",
                subjectID: "8bb63c15-0566-415e-b483-03abfd968c4f",
                changes: {
                    position: 2,
                    from: {
                        markID: "1",
                    },
                    to: {
                        markID: "2",
                    }
                }
           },
           {
                id: "52525252",
                action: "editSubject",
                subjectID: "3177af4f-3f41-4c4c-a30e-b4bce62bc42d",
                changes: {
                    from: {
                        title: "Теория автоматов и формальных языков",
                        countOfLabs: null
                    },
                    to: {
                        title: "Теория автоматов",
                        countOfLabs: null
                    }
                }
            },
       ],
       "14 июня 2021": [
            {
                id: "235432-51523",
                action: "editLab",
                subjectID: "3177af4f-3f41-4c4c-a30e-b4bce62bc42d",
                changes: {
                    position: 2,
                    from: {
                        markID: "1",
                    },
                    to: {
                        markID: "2",
                    }
                }
            },
            {
                id: "avbasR6",
                action: "addSubject",
                newSubject: {
                    title: "Lalalala",
                }
            },
       ]
   }

   constructor(){
       makeAutoObservable(this)
       this.recoverFromStorage()
   }

   addHistory(action, data, date){
       const currentData = {
           id: uuidv4(),
           action,
           ...data
       }
       if (!date){
           const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
           date = new Date()
           date = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
       }
       if (this.state[date]){
           this.state[date].push(currentData)
       } else {
           this.state[date] = [currentData]
       }
       //saveHistoryInStorage()
   }

   setHistory(state){
       this.state = state
   }

   saveHistoryInStorage(){
       AsyncStorage.setItem('history', JSON.stringify(history.state))
   }

   recoverFromStorage(){
       AsyncStorage.getItem('history').then(result => {
           if (result != null){
                this.setHistory(JSON.parse(result))
           }
       })
   }
}

export default new History()