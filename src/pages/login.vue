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
            <q-input
              type="password"
              float-label="Password"
              v-model="user.password"
              @keyup.enter="login"
            />
          </div>
        </div>
        <div class="text-center" style="margin-top: 30px">
          <q-btn color="primary" @click="login">
            <span v-if="!loading">LOG IN</span>
            <q-spinner-dots v-else/>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QSpinnerDots } from 'quasar'
export default {
    components: {
        QSpinnerDots
    },
    data() {
        return {
            loading: false,
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login: async function() {
            this.loading = true
            await this.$auth
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
            this.loading = false
        }
    }
}
</script>