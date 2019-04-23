const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.AutoTeacherOnUpdate = functions.database.ref('Subject/{ID}')
    .onUpdate((snapshot, event) => {
        return admin.database().ref('Teacher').child(snapshot.after.val().teacher_ID).child('name').once("value", (data) => {
            // console.log(data.val())
            return admin.database().ref('Subject').child(event.params.ID).update({ teacher: data.val() })
        });
       
    });