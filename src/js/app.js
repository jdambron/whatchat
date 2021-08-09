// Import Vue
import { createApp } from 'vue';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-Vue Plugin
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

// Import Framework7 Styles
import 'framework7/framework7-bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';
import { createStore } from 'vuex'
import AuthModule from '../pages/store/AuthModule'

// Create a new store instance.
const store = createStore({
  modules:{
    auth:AuthModule
  },
  state () {
    return {
      count: 0,
      message: 'message'
    }
  },
  mutations: {
    increment (state) {
    }
  }
})

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Init App
const app = createApp(App);
// Install the store instance as a plugin
app.use(store);

// Register Framework7 Vue components
registerComponents(app);

// Mount the app
app.mount('#app');
