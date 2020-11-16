import Vue from 'vue'

import App from "./app/App.vue";
import vuetify from "./plugins/vuetify.js";
import store from "./plugins/store.js";

new Vue({
    render: h => h(App),
    store,
    vuetify,
}).$mount("#app");