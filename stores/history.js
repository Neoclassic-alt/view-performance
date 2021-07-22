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
       "13.06.2021": [
           {
                id: "525453453",
                action: "editLab",
                subjectID: "5252-523523",
                changes: {
                    position: 2,
                    from: {
                        markID: "1",
                        title: null,
                        countOfLabs: null
                    },
                    to: {
                        markID: "2",
                        title: null,
                        countOfLabs: null
                    }
                }
           },
           {
                id: "52525252",
                action: "editSubject",
                subjectID: "5252-523523",
                changes: {
                    position: null,
                    from: {
                        markID: null, // state["14.06.2021"][0].changes.from.title
                        title: "Теория автоматов и формальных языков",
                        countOfLabs: null
                    },
                    to: {
                        markID: null,
                        title: "Теория автоматов",
                        countOfLabs: null
                    }
                }
            },
       ],
       "14.06.2021": [
            {
                id: "235432-51523",
                action: "editLab",
                subjectID: "5252-523523",
                changes: {
                    position: 2,
                    from: {
                        markID: "1",
                        title: null,
                        countOfLabs: null
                    },
                    to: {
                        markID: "2",
                        title: null,
                        countOfLabs: null
                    }
                }
        },
       ]
   }

   constructor(){
       makeAutoObservable(this)
   }

   addHistory(data, date = (new Date()).toLocaleDateString("ru")){
       if (this.state[date]){
           this.state[date].push(data)
       } else {
           this.state[date] = data
       }
   }

   setHistory(state){
       this.state = state
   }

   recoverFromStorage(){
       AsyncStorage.getItem('history').then(result => {
           if (result != null){
                this.setHistory(result)
           }
       })
   }
}

export default new History()