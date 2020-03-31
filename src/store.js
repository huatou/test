import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentUser: {}
    },
    mutations: {
        setCurrentUser(state, currentUser) {
            this.state.currentUser = currentUser;
        }
    },
    getters: {
        getCurrentUser: state => {
            return state.currentUser;
        }
    },
    actions: {}
})

export default store;
