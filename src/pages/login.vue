<template>
  <div id="login">
      <div class="layout-padding">
          <div class="mid-bg"></div>
          <div class="login-card shadow-4 bg-white">
            <h5 class="login-title">LOGIN</h5>
            <q-input float-label="Email" v-model="user.email"/>
            <q-input type="password" float-label="Password" v-model="user.password"/>
            <div class="text-center" style="margin-top: 30px">
              <q-btn color="primary" @click="login">LOGIN</q-btn>  
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          email: "",
          password: ""
        }
      };
    },
    methods: {
      login() {
        this.$auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(() => {
          window.location = '#/welcome';
        }).catch(err => {
          this.$q.dialog({
            title: 'Error',
            message: 'Ocurrió un error al iniciar sesión. Verifique los datos ingresados.'
          })
        })
      }
    }
  }
</script>