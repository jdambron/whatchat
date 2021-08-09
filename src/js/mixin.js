import { f7 } from 'framework7-vue';
export const mixin = {
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
