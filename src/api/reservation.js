export default{
    confirmBook,
    getReservations,
    cancelReservation,
}

import store from "@/stores"
import api from '@/utils'

async function confirmBook(date, condition) {
    let response = await api.post('/reservation/new', {
        "token": store.state.token,
        "checkInDate": date[0],
        "checkOutDate": date[1],
        "roomType": condition,
    })
    if(response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}

async function getReservations() {
    let response = await api.get('/reservation/list', {
        "token":store.state.token
    })
    return response.data;
}

async function cancelReservation(reservationId) {
    let response = await api.put('/reservation/cancel', {
        "token": store.state.token,
        "reservationId": reservationId,
    })
    if(response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
        
}