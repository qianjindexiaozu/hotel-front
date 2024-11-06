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
                store.state.localStorage.phone = decoded.claims.phone;
                store.state.localStorage.name = decoded.claims.name;
                store.state.localStorage.gender = decoded.claims.gender;
                store.state.localStorage.idNumber = decoded.claims.idNumber;
                store.state.localStorage.role = decoded.claims.role;
                store.state.localStorage.pic = decoded.claims.pic;
            } catch (error) {
                console.error("Token 解析错误:", error);
                return null;
            }
        },
        changePic(state, pic){
            store.state.localStorage.pic = pic;
        },
        cleanToken(){
            store.state.token = '';
            store.state.localStorage.phone = '';
            store.state.localStorage.name = '';
            store.state.localStorage.gender = '';
            store.state.localStorage.idNumber = '';
            store.state.localStorage.role = '';
            store.state.localStorage.pic = '';
            console.log(store.state.token);
        },
    },
    actions: {

    },

})

export default store
