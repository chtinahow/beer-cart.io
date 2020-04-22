import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start, useUrlParams, useGlobalObservable, useEffect } from 'tram-one'
import DebugPage from './components/DebugPage'
import HomePage from './components/HomePage'
import LoginHeader from './components/LoginHeader'
import RoomPage from './components/RoomPage'
import GoogleAPI, { signIn } from './components/GoogleAPI'
import GoogleAuthDialog from './components/GoogleAuthDialog'
import Firestore from './components/Firestore'
import JoinRoomPrompt from './components/JoinRoomPrompt'
import CreateRoomPrompt from './components/CreateRoomPrompt'
import PrivacyPolicyPage from './components/PrivacyPolicyPage'
import PageFooter from './components/PageFooter'
import './styles.scss'
import 'mustard-ui'

const html = registerHtml({
	HomePage, DebugPage, RoomPage, GoogleAPI, GoogleAuthDialog, Firestore, JoinRoomPrompt, CreateRoomPrompt, LoginHeader, PageFooter, PrivacyPolicyPage
})

const home = () => {
	const [isGoogleInitialzed] = useGlobalObservable('gapi.setIsGoogleInitialized')
	const [isSignedIn] = useGlobalObservable('gapi.isSignedIn')

	const router = () => {
		if (useUrlParams('/debug')) {
			return html`<DebugPage />`
		}
		if (useUrlParams('/policy')) {
			return html`<PrivacyPolicyPage />`
		}
		if (useUrlParams('/room/:roomId')) {
			// if the google client hasn't initialized yet, show a loading page
			if (!isGoogleInitialzed) {
				return html`<div>Loading.... </div>`
			}

			// if we are not signed in, start the auth flow
			if (!isSignedIn) {
				return html`<HomePage><GoogleAuthDialog /></HomePage>`
			}

			// we are signed in, go to the room page!
			return html`<RoomPage />`
		}
		return html`<HomePage />`
	}

	const currentPage = router()
	return html`
		<div>
			<GoogleAPI />
			<Firestore />
			<LoginHeader />
			${currentPage}
			<JoinRoomPrompt />
			<CreateRoomPrompt />
			<PageFooter />
		</div>
	`
}
start('#app', home)
