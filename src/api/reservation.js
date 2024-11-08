export default{
    confirmBook,
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