export default{
    getPrice,
    setPrice,
    getRoom,
    setRoom,
    deleteRoom,
    newRoom,
    questRoom,
    getAvailableRoom,
}

import api from '@/utils/index.js'
import store from '@/stores'

async function getPrice(){
    let response = await api.get('/room/price', {
        "token": store.state.token,
    })
    return response.data;
}

async function setPrice(editForm, newPrice) {
    let response = await api.put('/room/set_price', {
        "token": store.state.token,
        "roomType": editForm.roomType,
        "price": newPrice,
    })
    if (response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}

async function getRoom() {
    let response = await api.get('/room/list', {
        "token": store.state.token,
    })
    return response.data;
}

async function setRoom(roomId, ruleForm) {
    let response = await api.put('/room/set_room', {
        "token": store.state.token,
        "roomId": roomId,
        "roomNumber": ruleForm.roomNumber,
        "roomType": ruleForm.roomType,
        "status": ruleForm.status,
    })
    if (response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}

async function deleteRoom(roomId) {
    let response = await api.delete('/room/delete', {
        "token": store.state.token,
        "roomId": roomId
    })
    if (response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}

async function newRoom(ruleForm) {
    let response = await api.post('/room/new', {
        "token": store.state.token,
        "roomNumber": ruleForm.roomNumber,
        "roomType": ruleForm.roomType,
        "status": ruleForm.status,
    })
    if (response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}

async function questRoom(date, condition) {
    let response = await api.get('/room/quest', {
        "token": store.state.token,
        "checkInDate": date[0],
        "checkOutDate": date[1],
        "roomType": condition,
    })
    if (response.data.code === 0){
        return true;
    }
    else {
        return response.data.message;
    }
}

async function getAvailableRoom(roomType) {
    let response = await api.get('/room/getAvailableRoom', {
        "token": store.state.token,
        "roomType": roomType,
    })
    return response.data;
}
