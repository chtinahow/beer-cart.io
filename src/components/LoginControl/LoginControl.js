import { registerHtml, useGlobalObservable } from 'tram-one'
import { signIn, signOut, useGoogleOAuthSignedInStatus, getUserObject } from '../GoogleAPI'
import { leaveRoom } from '../Firestore'
import LoadingIndicator from '../LoadingIndicator'
import HomePage from '../HomePage'
import Avatar from '../Avatar'
import FeedbackControl from '../FeedbackControl'
import './LoginControl.scss'

const html = registerHtml({ Avatar, LoadingIndicator, HomePage, FeedbackControl })

export default () => {
	const { isSignedIn, setIsSignedIn } = useGoogleOAuthSignedInStatus()
	const [isGoogleInitialzed] = useGlobalObservable('gapi.isGoogleInitialized')
	const [roomRef] = useGlobalObservable('room-ref')
	const [roomData] = useGlobalObservable('room-data')
	const [reversedColorMode, setReversedColorMode] = useGlobalObservable('forced-reverse-color')
	const [systemPerfersDarkMode] = useGlobalObservable('system-perfers-dark')

	const currentMode = (reversedColorMode ^ systemPerfersDarkMode) ? 'Dark' : 'Light'
	const oppositeMode = currentMode === 'Dark' ? 'Light' : 'Dark'

	const signOutAndLeave = () => {
		setIsSignedIn(false)
		const user = getUserObject()
		if (roomData && roomRef) {
			leaveRoom(roomData, roomRef, user)
		}
		signOut()
	}

	const onSelectAction = event => {
		const action = event.target.value
		if (action === 'log-out') signOutAndLeave()
		if (action === 'swap-color-mode') setReversedColorMode(!reversedColorMode)
	}

	// if the google client hasn't initialized yet, show a loading page
	if (!isGoogleInitialzed) {
		return html`
			<div class="LoginControl">
				<LoadingIndicator primary='white' secondary='#00000022' />
				<!-- <FeedbackControl /> -->
			</div>
		`
	}

	if (isSignedIn) {
		const user = getUserObject()
		return html`
			<div class="LoginControl">
				<Avatar user=${user} />
				<select class="login-action" onchange=${onSelectAction}>
					<option value='no-action'> ${user.name}</option>
					<option value='swap-color-mode'> ${oppositeMode} Mode </option>
					<option value='log-out'>Log out</option>
				</select>
				<!-- <FeedbackControl /> -->
			</div>
		`
	}

	return html`
		<div class="LoginControl">
			<select class="login-action" onclick=${signIn}>
				<option>Sign In</option>
			</select>
			<!-- <FeedbackControl /> -->
		</div>
  `
}
