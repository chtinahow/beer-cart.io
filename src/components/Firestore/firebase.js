import firebase from 'firebase/app'
import 'firebase/firestore'
import shortHash from 'short-hash'

export const initializeFirebase = async () => {
	const config = await (await fetch('/__/firebase/init.json')).json()
	return firebase.initializeApp(config)
}

export const getRoom = roomId => firebase.firestore().collection('rooms').doc(roomId)

export const createRoom = async roomName => {
	try {
		const roomId = shortHash(roomName + (new Date()).getTime())
		const roomRef = await firebase.firestore().collection('rooms').doc(roomId).set({
			roomName,
			conversations: [
				// the initial empty conversation
				{ link: '', users: [] }
			]
		})
		return roomId
	} catch (error) {
		console.error(error)
	}
}
