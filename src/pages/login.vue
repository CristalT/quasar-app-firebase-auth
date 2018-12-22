<template>
  <div id="login">
    <div class="layout-padding">
      <div class="mid-bg"></div>
      <div class="login-card shadow-4 bg-white">
        <h5 class="login-title">LOGIN</h5>
        <div class="row gutter-md">
          <div class="col-xs-12">
            <q-input float-label="Email" v-model="user.email"/>
          </div>
          <div class="col-xs-12">
            <q-input type="password" float-label="Password" v-model="user.password"/>
          </div>
        </div>
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
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$auth
                .signInWithEmailAndPassword(this.user.email, this.user.password)
                .then(() => {
                    this.$router.push('/')
                })
                .catch(err => {
                    this.$q.dialog({
                        title: 'Error',
                        message:
                            'An error has ocurred while login in. Check your user data.'
                    })
                })
        }
    }
}
</script>