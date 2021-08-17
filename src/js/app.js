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
import firebase from 'firebase'

// Create a new store instance.
const store = createStore({
  modules:{
    auth:AuthModule
  },
  state: {
    alert_message:null,
  },
  getters: {
    alert_message:state=>state.alert_message
  },
  mutations: {
    setAlertMessage(state,payload){
      state.alert_message = payload
    }
  }
})

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Check if the user is already connected
let app = null;
firebase.auth().onAuthStateChanged((user) => {
  if (user && user.emailVerified) {
    // User is signed in
    store.commit('setSignedIn', true)
  } else {
    // User is signed out
    store.commit('setSignedIn', false)
  }
});

if(!app){
  // Init App
  const app = createApp(App);
  // Install the store instance as a plugin
  app.use(store);

  // Register Framework7 Vue components
  registerComponents(app);

  // Mount the app
  app.mount('#app');
}
