import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue'

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
        change({ commit, dispatch }, content) {
            dispatch('buildAst', content);
        },
        buildAst({ commit }, content) {
            axios.post(`/api/ast/build`, {
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