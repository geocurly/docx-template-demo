import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex);

let defaultContent = 'Hello ${name}!\n' +
    'Do you want to try DocxTemplate with ${ filename ?: `your document`}?\n' +
    'You can use ${\n\tis_simple ?\n\t`simple conditions` :\n' +
    '\t${ nested ? `difficult \\`nested\\` ternary operator` : `${ foo  ?: ${ bar ?: \\${escaped} }}`}\n} ' +
    'and many another features!\n\n' +
    'Written on ${ yesterday | modify(`+1 day`) | format(`d.m.Y`, timezone) }\n' +
    'With love. ${ signature:100px:50px }\n';

export default new Vuex.Store({
    state: {
        ast: {},
        content: null,
        default: defaultContent,
    },
    getters: {
        ast: state => {return state.ast},
        content: state => {return state.content},
        default: state => {return state.default},
    },
    actions: {
        change({ dispatch }, content) {
            dispatch('buildAst', content);
        },
        setContent({ commit }, content) {
            commit('SET_CONTENT', content);
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
        },
    },
    mutations: {
        SET_AST(state, ast) {
            state.ast = ast;
        },
        SET_CONTENT(state, content) {
            state.content = content;
        },
    }
});