import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable, toJS } from 'mobx';
import {colors} from './../components/colors'

// хранилище ярлыков
class Marks {
    state = [
        {
            id: 1,
            color: colors.green,
            title: "Готово",
            active: true, // можно ли использовать для пометки лабортаорных работ (при удалении ставится в false)
            removable: false, // можно удалить (false только для "нет состояния", "в процессе" и "готово")
        },
        {
            id: 4,
            color: '#F8D456',
            title: "Пишу отчёт",
            active: true,
            removable: false,
        },
        {
            id: 3,
            color: '#7D5DD7',
            title: "В процессе",
            active: true,
            removable: false,
        },
        {
            id: 2,
            color: colors.lightGray,
            title: "Не готово",
            active: true,
            removable: false
        }
    ]
    recoveryState = "pending"

    constructor(){
        makeAutoObservable(this, {
            getMark: false,
            getMarkStyles: false
        })
        this.recoverFromStorage()
    }

    recoverFromStorage(){
        AsyncStorage.getItem('marks').then(result => {
            if (result !== null){
                this.state = [...this.state, ...JSON.parse(result)]
            }
        })
    }

    getMark(id){
        const marks = this.state
        for(let i = 0; i < marks.length; i++){
            if (id && marks[i].id == id){
                return marks[i]
            }
            if ((id === "" || id === 0) && marks[i].id == 2){
                return marks[i]
            }
        }
    }

    getMarkStyles(id){
        return toJS(this.getMark(id).styles)
    }

    // функция будет доработана
    /*addMark(mark){
        this.marks = [...this.marks, mark]
        AsyncStorage.setItem('marks', JSON.stringify(this.marks))
    }*/

    removeMark(id){
        const mark = this.getMark(id)
        mark.active = false
    }

    clearStorage(){
        AsyncStorage.removeItem('marks')
    }
}

export default new Marks()