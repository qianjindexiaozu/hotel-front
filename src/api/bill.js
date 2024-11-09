export default{
    newBill,
    getBillInfo,
    confirmPayment,
    getCheckOutInfo,
    leave,
}

import store from "@/stores"
import api from "@/utils"

async function newBill(reservationId, userId, ruleForm) {
    let response = await api.post('/bill/new', {
        "token": store.state.token,
        "reservationId": reservationId,
        "roomId": ruleForm.selectedRoomId,
        "userId": userId,
        "name2": ruleForm.name2,
        "idNumber2": ruleForm.idNumber2,
    })
    if(response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}

async function getBillInfo() {
    let response = await api.get('/bill/info', {
        "token": store.state.token,
    })
    return response.data;
}

async function confirmPayment(billId) {
    let response = await api.put('/bill/pay', {
        "token": store.state.token,
        "billId": billId
    })
    if(response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}

async function getCheckOutInfo() {
    let response = await api.get('/bill/checkOutInfo', {
        "token": store.state.token,
    })
    return response.data;
}

async function leave(billId) {
    let response = await api.put('/bill/leave', {
        "token": store.state.token,
        "billId": billId,
    })
    if(response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}
