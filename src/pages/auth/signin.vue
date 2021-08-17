<template>
  <f7-page name="signin">
    <f7-navbar title="Sign in"></f7-navbar>
    <f7-list inline-labels no-hairlines-md>
      <f7-list-input
        :value="email"
        @input="email=$event.target.value"
        label="E-mail"
        type="email"
        placeholder="Your e-mail"
        clear-button
        >
      </f7-list-input>
      <f7-list-input
        :value="password"
        @input="password=$event.target.value"
        label="Password"
        type="password"
        placeholder="Your password"
        clear-button
        >
      </f7-list-input>
    </f7-list>
    <f7-block>
      <f7-button outline @click="signIn">Sign in</f7-button>
    </f7-block>
    <div style="text-align:center;">
      <f7-link v-if="show_resend_email" @click="resendEmail" :color="color(time_left)">Resend confirmation email</f7-link><br>
      <f7-link href="/signup/">Don't have an account? Sign up</f7-link><br>
      <f7-link @click="forgotPassword">Forgot password</f7-link>
    </div>
  </f7-page>
</template>
<script>
import firebase from 'firebase';

export default {
  data(){
    return {
      email:null,
      password:null,
      time_left:-1
    }
  },
  computed:{
    show_resend_email(){
      return this.$store.getters.show_resend_email
    }
  },
  methods:{
    forgotPassword(){
      const self = this;
      if (this.email!=null) {
        firebase.auth().sendPasswordResetEmail(this.email)
          .then(() => {
            // Password reset email sent!
            self.$store.commit('setAlertMessage', 'A password reset has been sent')
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            self.$store.commit('setAlertMessage', errorMessage)
          });
      } else {
        self.$store.commit('setAlertMessage', 'Enter a valid email')
      }
    },
    color(timeleft){
      if (timeleft <= 0) {
        return '#007aff'
      } else {
        return 'gray'
      }
    },
    resendEmail(){
      const self = this
      if (self.time_left<=0) {
        self.$store.dispatch('sendVerification')
        self.countDown()
      }
    },
    countDown(){
      const self = this
      self.time_left = 60
      var timer = setInterval(function(){
        self.time_left-=1
        if (self.time_left <= 0){
          clearInterval(timer)
        }
      },1000)
    },
    signIn(){
      var payload = {}
      payload.email = this.email
      payload.password = this.password
      this.$store.dispatch('signIn', payload)
    }
  }
}
</script>
