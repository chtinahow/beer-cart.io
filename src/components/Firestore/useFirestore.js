import { useEffect, useGlobalObservable } from 'tram-one'
import { initializeFirebase, getRoom } from './firebase'
import { leaveRoom } from './api'
// import { resetMockData } from './api'

export const initializeApp = async () => {
	const [isFirebaseInitialized, setIsFirebaseInitialized] = useGlobalObservable('firebase-intialized', false)
	// if we have already intialized the app, return
	// TODO investigate why this effect is getting called twice
	if (isFirebaseInitialized) return

	// fetch the config from the hosted access information
	await initializeFirebase()

	// const ref = firebase.firestore().collection('rooms').doc('cr-1234')
	// resetMockData(ref)

	// firebase is now intiialized
	setIsFirebaseInitialized(true)
}

export default roomId => {
	const [, setRoomRef] = useGlobalObservable('room-ref')
	const [, setRoomData] = useGlobalObservable('room-data')

	// assume room exists, until we find out it doesn't
	const [, setRoomExists] = useGlobalObservable('room-exists', true)

	useEffect(async () => {
		const [isFirebaseInitialized] = useGlobalObservable('firebase-intialized', false)

		if (!isFirebaseInitialized) return
		const ref = getRoom(roomId)
		setRoomRef(ref)

		// listen for changes to the firestore and update the global store when that happens
		ref.onSnapshot(doc => {
			setRoomExists(doc.exists)
			console.log('SNAPSHOT', doc.data())
			setRoomData(doc.data())
		})
	})
}
