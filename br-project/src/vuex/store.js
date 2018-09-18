import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    token:'',
    user:'',
    loginview:false,
    retrieveview:false,
    registerview:false,
    loginstatus:false,
    moneytype:'cny'

}

// 定义所需的 mutations
const mutations = {
    changeype(state,moneytype){
       state.moneytype=moneytype;
    },
    changestatus(state,status){
        state.loginstatus=status;

    },
    showregister(state,registerview){
        state.registerview=registerview;
      
    },
    showretrieve(state,retrieveview){
        state.retrieveview=retrieveview;
    },
    showlogin(state,loginview){
        state.loginview=loginview;
    },
    login(state,access_token){
       state.token=access_token;
    },
    getuser(state,user){
      state.user=user;
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})