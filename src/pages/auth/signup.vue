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
import { mixin } from '../../js/mixin';
export default {
  mixins:[mixin],
  data(){
    return {
      name:null,
      email:null,
      password:null
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
  }
}
</script>
