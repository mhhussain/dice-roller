const _ = require('lodash');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.ping = functions.https.onCall((data, context) => {
  return { message: 'pong' };
});

exports.getSessionByName = functions.https.onCall((data, context) => {
  const { name } = data;

  if (!(typeof name === 'string') || name.length === 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'name argument required'
    );
  }

  var db = admin.firestore();
  return db
    .collection('sessions')
    .where('name', '==', name)
    .get()
    .then((sh) => {
      let ret = [];
      sh.forEach((s) => {
        ret.push(s.data());
      });
      return ret;
    });
});
