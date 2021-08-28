import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

// хранилище лабораторных
class Labs {
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
    this.clearStorage()
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

  setFavorite(id){
    this.getSubject(id).favorite = !this.getSubject(id).favorite
    this.saveLabsInStorage()
  }

  recoverFromStorage(){
    this.recoveryState = "pending"
    AsyncStorage.getItem('labs').then(result => {
    if (result !== null){
      this.setState(JSON.parse(result))
    }
    })
    AsyncStorage.getItem('selectedSemestr').then(result => {
      if (result !== null){
        this.setSemestr(Number(result), false)
      }
      this.recoveryState = "done"
    })
  }

  setState(result){
    this.state = result
  }

  clearStorage(){
    AsyncStorage.removeItem('labs')
    AsyncStorage.removeItem('selectedSemestr')
  }

  setSemestr(semestr, set = true){
    this.selectedSemestr = semestr
    if (set){
      AsyncStorage.setItem('selectedSemestr', String(semestr))
    }
  }

  saveLabsInStorage(){
    AsyncStorage.setItem('labs', JSON.stringify(this.state))
  }

  setChanged(){
    this.changed = !this.changed
  }
}
  
export default new Labs()