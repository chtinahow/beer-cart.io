const admin = require('firebase-admin')
const functions = require('firebase-functions')
const { getRoom, joinRoom, joinConversation } = require('./api')
const mockData = require('./mock-data')

// get access to firestorm database
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

// populate with data
db.collection('rooms').doc('cr-1234').set(mockData)

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!')
})

/* NOTE: functions added here need to be written in the firebase.json rewrites */

exports.getRoom = functions.https.onRequest(getRoom(db))

exports.joinRoom = functions.https.onRequest(joinRoom(db))

exports.joinConversation = functions.https.onRequest(joinConversation(db))
