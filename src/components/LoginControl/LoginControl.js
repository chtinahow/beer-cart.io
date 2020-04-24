import { registerHtml, useGlobalObservable } from 'tram-one'
import { signIn, signOut, useGoogleOAuthSignedInStatus, getUserObject } from '../GoogleAPI'
import { leaveRoom } from '../Firestore'
import LoadingIndicator from '../LoadingIndicator'
import HomePage from '../HomePage'
import Avatar from '../Avatar'
import './LoginControl.scss'

const html = registerHtml({ Avatar, LoadingIndicator, HomePage })

export default () => {
	const { isSignedIn, setIsSignedIn } = useGoogleOAuthSignedInStatus()
	const [isGoogleInitialzed] = useGlobalObservable('gapi.isGoogleInitialized')
	const [roomRef] = useGlobalObservable('room-ref')
	const [roomData] = useGlobalObservable('room-data')

	const signOutAndLeave = () => {
		setIsSignedIn(false)
		const user = getUserObject()
		if (roomData && roomRef) {
			leaveRoom(roomData, roomRef, user)
		}
		signOut()
	}

	// if the google client hasn't initialized yet, show a loading page
	if (!isGoogleInitialzed) {
		return html`
			<div class="LoginControl">
				<LoadingIndicator />
			</div>
		`
	}

	if (isSignedIn) {
		const user = getUserObject()
		return html`
			<div class="LoginControl">
				<Avatar user=${user} />
				<select class="login-action" onchange=${signOutAndLeave}>
					<option> ${user.name}</option>
					<option>Log out</option>
				</select>
			</div>
		`
	}

	return html`
		<div class="LoginControl">
			<select class="login-action" onclick=${signIn}>
				<option>Sign In</option>
			</select>
		</div>
  `
}
