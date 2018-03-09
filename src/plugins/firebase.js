import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBzzE4ISXNiIB0c8g6rv8kxSOk0dlgL3qc',
  authDomain: 'okinoi-94a39.firebaseapp.com',
  databaseURL: 'https://okinoi-94a39.firebaseio.com',
  projectId: 'okinoi-94a39',
  storageBucket: 'okinoi-94a39.appspot.com',
  messagingSenderId: '758988975300'
}

export const fireApp = firebase.initializeApp(config)

export const AUTH = fireApp.auth()

export default ({ app, router, Vue }) => {
  Vue.prototype.$auth = AUTH
}