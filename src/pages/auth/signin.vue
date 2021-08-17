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
      <f7-link @click="resendEmail">Resend confirmation email <span v-if="time_left>0">{{time_left}}</span></f7-link><br>
      <f7-link href="/signup/">Don't have an account? Sign up</f7-link><br>
      <f7-link>Forgot password</f7-link>
    </div>
  </f7-page>
</template>
<script>
export default {
  data(){
    return {
      email:null,
      password:null,
      time_left:-1
    }
  },
  methods:{
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
