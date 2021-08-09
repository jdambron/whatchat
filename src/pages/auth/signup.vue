<template>
  <f7-page name="signup">
    <f7-navbar title="Sign up" back-link="Back"></f7-navbar>
    <div style="text-align:center;">
      <f7-icon f7="person_alt_circle" size="150px"></f7-icon>
    </div>
    <f7-list inline-labels no-hairlines-md>
      <f7-list-input
        :value="name"
        @input="name=$event.target.value"
        label="name"
        type="text"
        placeholder="your name"
        clear-button
        >
      </f7-list-input>
      <f7-list-input
        :value="email"
        @input="email=$event.target.value"
        label="e-mail"
        type="email"
        placeholder="your e-mail"
        clear-button
        >
      </f7-list-input>
      <f7-list-input
        :value="password"
        @input="password=$event.target.value"
        label="password"
        type="password"
        placeholder="your password"
        clear-button
        >
      </f7-list-input>
    </f7-list>
    <f7-block>
      <f7-button outline @click="signUp">sign up</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
import { f7 } from 'framework7-vue';
export default {
  data(){
    return {
      name:null,
      email:null,
      password:null
    }
  },
  computed:{
    alert_message() {
      return this.$store.getters.alert_message
    }
  },
  watch:{
    alert_message(value) {
      const self = this
      this.showToastBottom(value)
      setTimeout(()=>{
        self.$store.commit('setAlertMessage',null)
      },200)
    }
  },
  methods:{
    signUp(){
      const self = this
      var payload = {}
      payload.name = this.name
      payload.email = this.email
      payload.password = this.password
      this.$store.dispatch('signUp',payload)
    },
    showToastBottom(text) {
      const self = this
      console.log(self)
      // Create toast
      if (!self.toastBottom || self.toastBottom.destroyed) {
        self.toastBottom = f7.toast.create({
          text: text,
          closeTimeout: 2000,
          destroyOnClose: true
        });
      }
      // Open it
      self.toastBottom.open();
    }
  }
}
</script>
