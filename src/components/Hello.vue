<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" class="glossy">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Quasar App
        <div slot="subtitle">Running on Quasar v{{$q.version}}</div>
      </q-toolbar-title>
    </q-toolbar>

    <div slot="left">
      <!--
        Use <q-side-link> component
        instead of <q-item> for
        internal vue-router navigation
      -->

      <q-list no-border link inset-delimiter>
        <q-list-header>Vue app</q-list-header>
        <q-item @click="logout">
          <q-item-side icon="exit_to_app" />
          <q-item-main label="Log out" sublabel="Close your actual session" />
        </q-item>
      </q-list>
    </div>

    <!--
      Replace following <div> with
      <router-view /> component
      if using subRoutes
    -->
    <div class="layout-padding logo-container ">
        <q-btn type="button" @click="getUser" primary> Get user </q-btn>
        <h3>Current User</h3>
        <pre v-text="user" class="bg-black text-white"></pre>
    </div>
  </q-layout>
</template>

<script>
import {
  dom,
  event,
  openURL,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  Toast,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'


export default {
  name: 'index',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain
  },
  data () {
    return {
      user : null
    }
  },
  computed: {
  },
  methods: {
    logout(){
      let timeout = 1500;

      Toast.create({
        html: 'Logging out',
        icon: 'alarm_add',
        timeout,
        color: '#fff',
        bgColor: '#444',
      })

      setTimeout( () => {
        // Logout
        this.$oauth.logout()

        // Redirect to Login
        this.$router.replace('/login')

      }, timeout)
    },
    async getUser(){
      let response = await this.$oauth.getUser()
      this.user = response.data
    }
  },
}
</script>

<style lang="scss"></style>
