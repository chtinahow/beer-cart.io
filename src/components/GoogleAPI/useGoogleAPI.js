// api docs https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest

import { useGlobalObservable } from 'tram-one'
import { API_KEY, CLIENT_ID, SCOPES } from './access'

const clientOptions = {
	apiKey: API_KEY,
	clientId: CLIENT_ID,
	scope: SCOPES
}

// this is triggered onLoad, after the gapi script has been loaded
export const initializeClient = async () => {
	const [, setSignedIn] = useGlobalObservable('gapi.isSignedIn', false)

	try {
		await gapi.client.init(clientOptions)

		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(setSignedIn)

		// Handle the initial sign-in state.
		setSignedIn(getCurrentStatus())
	} catch (error) {
		console.error('Error Loading Google OAuth')
		console.error(error)
	}
}

export const signIn = () => gapi.auth2.getAuthInstance().signIn()
export const signOut = () => gapi.auth2.getAuthInstance().signOut()
export const onLoad = () => gapi.load('client:auth2', initializeClient)
export const getCurrentStatus = () => gapi.auth2.getAuthInstance().isSignedIn.get()

export const useGoogleOAuthSignedInStatus = () => {
	const [isSignedIn] = useGlobalObservable('gapi.isSignedIn', false)
	return { isSignedIn }
}

// calendar actions
export const createEvent = (...args) => gapi.client.calendar.events.insert(...args)
export const deleteEvent = (...args) => gapi.client.calendar.events.delete(...args)
