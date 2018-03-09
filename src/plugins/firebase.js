import firebase from 'firebase'


const config = {
  // Replace this with your firebase app config parameters
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...'
}

export const fireApp = firebase.initializeApp(config)

export const AUTH = fireApp.auth()

export default ({ app, router, Vue }) => {
  Vue.prototype.$auth = AUTH
}