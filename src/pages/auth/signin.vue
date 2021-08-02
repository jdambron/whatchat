<template>
  <f7-page name="signin">
    <f7-navbar title="Sign in" back-link="Back"></f7-navbar>
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
      <f7-button outline>Sign in</f7-button>
    </f7-block>
    <div style="text-align:center;">
      <f7-link>Resend confirmation email</f7-link><br>
      <f7-link>Don't have an account? Sign up</f7-link><br>
      <f7-link>Forgot password</f7-link>
    </div>
  </f7-page>
</template>
<script>
export default {
  data(){
    return {
      email:null,
      password:null
    }
  }
}
</script>
