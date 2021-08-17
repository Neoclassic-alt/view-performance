import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

class History {
    /* Модель данных:
    state = [
        {
            date: "13 июня 2021",
            actions: [{
                id: "525453453",
                action: "editLab",
                subjectID: "8bb63c15-0566-415e-b483-03abfd968c4f",
                changes: {
                    position: 2,
                    fromMarkID: "1", // state[0].actions[0].changes.fromMarkID
                    toMarkID: "2",
                }
                },
                {
                id: "52525252",
                action: "editSubject",
                subjectID: "3177af4f-3f41-4c4c-a30e-b4bce62bc42d",
                changes: {
                    from: {
                        title: "Теория автоматов и формальных языков",
                        countOfLabs: 9 // state[0].actions[0].changes.from.countOfLabs
                    },
                    to: {
                        title: "Теория автоматов",
                        countOfLabs: 9
                    }
                }
            }]
        },
    ],
    [
        date: "14 июня 2021",
        actions: [
            {
                id: "235432-51523",
                action: "editLab",
                subjectID: "3177af4f-3f41-4c4c-a30e-b4bce62bc42d",
                changes: {
                    position: 2,
                    fromMarkID: "1",
                    toMarkID: "2",
                }
            },
            {
                id: "avbasR6",
                action: "addSubject",
                subjectID: "3177af4f-3f41-4c4c-a30e-b4bce62bc42d",
                newSubject: {
                    title: "Lalalala",
                    countOfLabs: 6
                }
            },
            {
                id: "avbasR6",
                action: "deleteSubject",
                subjectID: "3177af4f-3f41-4c4c-a30e-b4bce62bc42d",
                deletedSubjectTitle: "Lalalala"
            }
        ],
    ]*/
    state = []

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
       /*if (this.state[date]){
           this.state[date].push(currentData)
       } else {
           this.state[date] = [currentData]
       }*/
       if (this.state.some(day => day.date == date)){
        this.state.find(day => day.date == date).actions.push(currentData)
       } else {
        this.state.push({
            date, 
            actions: [currentData]
        })  
       }

       this.saveHistoryInStorage()
   }

   clearHistory() {
       this.state = []
       this.saveHistoryInStorage()
   }

   setHistory(state){
       this.state = state
   }

   saveHistoryInStorage(){
       AsyncStorage.setItem('history', JSON.stringify(this.state))
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