<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Quasar + Firebase Auth
          <div slot="subtitle">Quasar Framework 0.15.6 + Firebase Auth</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Essential Links</q-list-header>
        <q-item :link="true" to="/">
          <q-item-side icon="home"/>
          <q-item-main label="HOME" />
        </q-item>
        <q-item @click.native="logout">
          <q-item-side icon="power settings new" />
          <q-item-main label="EXIT" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    logout() {
      this.$auth.signOut().then(() => {
        console.log('Logout Successfull')
      })
    }
  },
  beforeCreate() {
    this.$auth.onAuthStateChanged(user => {
    if (!user)
        this.$router.push({ path: 'login' })
    })
  }
}
</script>

<style>
</style>
