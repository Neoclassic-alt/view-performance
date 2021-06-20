import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

// хранилище лабораторных
class Labs {
  // Модель данных:
  /*semestr = [ 
    [ // 1-ый семестр
      {
        id: 'gw4gw4g4wgws44yh',
        title: "Высшая математика",
        marks: ["Ready", "Ready", "Ready"],
      },
      {
        id: '43y35bcvchfh',
        title: "История Древнего Рима",
        marks: ["Ready", "Ready", "Ready"],
      },
      {
        id: '2352546bntz',
        title: "Полиция",
        marks: ["Ready", "Ready", "Ready"],
      }
    ],
    [ // 2-ый семестр
      {
        id: '5252xxzfhhdfhf',
        title: "Высшая математика",
        marks: ["Ready", "In Progress", "Didn't start"],
      },
      {
        id: 'nnfgdgbbbgergrg',
        title: "История Древнего Рима",
        marks: ["Ready", "Didn't start", "Didn't start"],
      },
      {
        id: 'vcfbvbcnbnghhg',
        title: "Полиция",
        marks: ["In Progress", "In Progress", "Didn't start"],
      }
    ],
    // 3-ый семестр
    [], 
    // ...и так далее. 
  ]
  ],*/
  state = [
    [], [], [], [], [], [], [], [], [], [], [], []
  ]
  selectedSemestr = 1
  recoveryState = "pending"
  changed = true

  constructor(){
    makeAutoObservable(this, {
      getSubject: false,
      getVisibleSubjects: false
    })
    this.recoverFromStorage()
  }

  addMarkToLab(ID, index, markID){
    this.getSubject(ID).marks[index] = markID
    this.saveLabsInStorage()
  }

  getSubject(subjectID){
    return this.state[this.selectedSemestr - 1].find(item => item.id == subjectID)
  }

  getVisibleSubjects(){
    return this.state[this.selectedSemestr - 1].filter(item => item.showing)
  }

  addSubject(title, countOfLabs){
    this.state[this.selectedSemestr - 1].push({
      id: uuidv4(),
      title,
      marks: Array(countOfLabs).fill("2"),
      showing: true // показывается ли 
    })
    this.saveLabsInStorage()
  }

  editSubject(id, newTitle, newCountOfLabs){
    const elem = this.getSubject(id)
    elem.title = newTitle
    if (newCountOfLabs > elem.marks.length){
      elem.marks = elem.marks.concat(Array(newCountOfLabs - elem.marks.length).fill(""))
    }
    if (newCountOfLabs < elem.marks.length){
      elem.marks.length = newCountOfLabs
    }
    this.saveLabsInStorage()
  }

  removeSubject(id){
    this.getSubject(id).showing = false
    this.saveLabsInStorage()
  }

  recoverFromStorage(){
    this.recoveryState = "pending"
    AsyncStorage.getItem('labs').then(result => {
    if (result !== null){
      this.state = JSON.parse(result)
    }
    })
    AsyncStorage.getItem('selectedSemestr').then(result => {
      if (result !== null){
        this.selectedSemestr = Number(result)
      }
      this.recoveryState = "done"
    })
  }

  clearStorage(){
    AsyncStorage.removeItem('labs')
    AsyncStorage.removeItem('selectedSemestr')
  }

  setSemestr(semestr){
    this.selectedSemestr = semestr
    AsyncStorage.setItem('selectedSemestr', String(semestr))
  }

  saveLabsInStorage(){
    AsyncStorage.setItem('labs', JSON.stringify(this.state))
  }

  setChanged(){
    this.changed = !this.changed
  }
}
  
export default new Labs()