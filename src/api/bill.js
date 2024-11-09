export default{
    newBill,
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