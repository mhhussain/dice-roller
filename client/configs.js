import _ from 'lodash';

export default {
  firebaseConfig: {
    apiKey: _.defaultTo(
      process.env.FIREBASE_API_KEY,
      'AIzaSyClrNOXnAsLnRFZxj-WJRG9FbQoBhoAq3I'
    ),
    authDomain: _.defaultTo(
      process.env.FIREBASE_AUTH_DOMAIN,
      'iammoo-dice-roller.firebaseapp.com'
    ),
    databaseURL: _.defaultTo(
      process.env.FIREBASE_DATABASE_URL,
      'https://iammoo-dice-roller.firebaseio.com'
    ),
    projectId: _.defaultTo(
      process.env.FIREBASE_PROJECT_ID,
      'iammoo-dice-roller'
    ),
    storageBucket: _.defaultTo(
      process.env.FIREBASE_STORAGE_BUCKET,
      'iammoo-dice-roller.appspot.com'
    ),
    messagingSenderId: _.defaultTo(
      process.env.FIREBASE_MESSAGING_SENDER_ID,
      '1094719742577'
    ),
    appId: _.defaultTo(
      process.env.FIREBASE_APP_ID,
      '1:1094719742577:web:2d348a30e369b37d8331d0'
    ),
    measurementId: _.defaultTo(
      process.env.FIREBASE_MEASUREMENT_ID,
      'G-PWQHV5S6FB'
    ),
  },
};
