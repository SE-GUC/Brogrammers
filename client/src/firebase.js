import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyAns7uSgTfwtfXA-M9_ne4rx1R-wDv8kAI',
  authDomain: 'brogrammers-9a16d.firebaseapp.com',
  databaseURL: 'https://brogrammers-9a16d.firebaseio.com',
  projectId: 'brogrammers-9a16d',
  storageBucket: 'brogrammers-9a16d.appspot.com',
  messagingSenderId: '879922286130'
}

firebase.initializeApp(config)

export default firebase
