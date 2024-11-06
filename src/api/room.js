export default{
    getPrice,
    setPrice,
}

import api from '@/utils/index.js'
import store from '@/stores'

async function getPrice(){
    let response = await api.get('/room/price', {
        "token": store.state.token,
    })
    if(response.data.code === 0){
        return response.data;
    }
    else{
        return response.data.message;
    }
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