import { useGlobalObservable } from 'tram-one'
import { API_KEY, CLIENT_ID, SCOPES } from './access'

const clientOptions = {
	apiKey: API_KEY,
	clientId: CLIENT_ID,
	// discoveryDocs: DISCOVERY_DOCS,
	scope: SCOPES
}

const signIn = () => gapi.auth2.getAuthInstance().signIn()
const signOut = () => gapi.auth2.getAuthInstance().signOut()
const onLoad = () => gapi.load('client:auth2', clientOptions)
const getCurrentStatus = () => gapi.auth2.getAuthInstance().isSignedIn.get()

const useGAPIClient = async () => {
	const [, setSignedIn] = useGlobalObservable('gapi.isSignedIn', false)

	try {
		await gapi.client.init(clientOptions)

		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(setSignedIn)

		// Handle the initial sign-in state.
		setSignedIn(getCurrentStatus())
	} catch (error) {
		console.error('Error Loading Google OAuth')
	}
}

// calendar actions
const createEvent = gapi.client.calendar.events.insert
const deleteEvent = gapi.client.calendar.events.delete

export { signIn, signOut, onLoad, getCurrentStatus, useGAPIClient, createEvent, deleteEvent }
