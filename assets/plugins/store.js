import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue'
import highlight from "./highlight";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ast: {},
    },
    getters: {
        ast: state => {return state.ast},
        content: state => {return state.content},
    },
    actions: {
        change({ dispatch }, content) {
            dispatch('buildAst', content);
        },
        async buildAst({ commit }, content) {
            return axios.post(`/api/ast/build`, {
                content: content
            }).then((response) => {
                commit('SET_AST', response.data)
            }).catch((err) => {
                commit('SET_AST', {error: "Что-то пошло не так"})
                console.error(err);
            })
        }
    },
    mutations: {
        SET_AST(state, ast) {
            state.ast = ast;
        },
    }
});