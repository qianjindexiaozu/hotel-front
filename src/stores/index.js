import { createStore } from "vuex";
import { jwtDecode } from "jwt-decode";


const store = createStore({
    state(){
        return{
            token: '',
            localStorage: {
                name:'',
                gender:'',
                phone:'',
                idNumber:'',
                role:'',
                pic:'',
            }
        }
    },
    getters: {

    },
    mutations: {
        setToken(state, newToken){
            state.token = newToken
            console.log("setToken正在执行", this.state.token)
        },
        parseToken(state){
            try {
                // 不需要验证签名，只解析 payload
                const decoded = jwtDecode(state.token);
                console.log(decoded);
                state.localStorage.phone = decoded.claims.phone;
                state.localStorage.name = decoded.claims.name;
                state.localStorage.gender = decoded.claims.gender;
                state.localStorage.idNumber = decoded.claims.idNumber;
                state.localStorage.role = decoded.claims.role;
                state.localStorage.pic = decoded.claims.pic;
            } catch (error) {
                console.error("Token 解析错误:", error);
                return null;
            }
        },
        changePic(state, pic){
            state.localStorage.pic = pic;
        },
        cleanToken(){
            state.token = '';
            state.localStorage.phone = '';
            state.localStorage.name = '';
            state.localStorage.gender = '';
            state.localStorage.idNumber = '';
            state.localStorage.role = '';
            state.localStorage.pic = '';
        },
    },
    actions: {

    },

})

export default store
