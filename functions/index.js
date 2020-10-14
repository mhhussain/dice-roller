const functions = require('firebase-functions');

exports.ping = functions.https.onCall((data, context) => {
  return { message: 'pong' };
});
