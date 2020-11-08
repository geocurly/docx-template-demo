import Demo from './app/Demo.vue';
import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueCodemirror from 'vue-codemirror'
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(VueMaterial);
Vue.use(VueCodemirror, {events: ['changes']})
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        ast: {},
        content: '${ \n' +
                '\tdocx-template ? \n' +
                '\tdocx-template | parse(`OpenXMLDocument`) : \n' +
                '\tsaySorry( `:(` )\n' +
            '}\n'
    },
    getters: {
        ast: state => {return state.ast},
        content: state => {return state.content},
    },
    actions: {
        change({ commit, dispatch }, content) {
            commit('SET_CONTENT', content);
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
        SET_AST (state, ast) {
            state.ast = ast;
        },
        SET_CONTENT (state, content) {
            state.content = content;
        }
    }
})


new Vue({
    render: h => h(Demo),
    store: store,
}).$mount("#app");