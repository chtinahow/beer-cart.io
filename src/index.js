import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start, useUrlParams, useGlobalObservable, useEffect } from 'tram-one'
import DebugPage from './components/DebugPage'
import HomePage from './components/HomePage'
import LoadingPage from './components/LoadingPage'
import LoginHeader from './components/LoginHeader'
import RoomPage from './components/RoomPage'
import GoogleAPI from './components/GoogleAPI'
import GoogleAuthDialog from './components/GoogleAuthDialog'
import Firestore from './components/Firestore'
import JoinRoomPrompt from './components/JoinRoomPrompt'
import CreateRoomPrompt from './components/CreateRoomPrompt'
import PrivacyPolicyPage from './components/PrivacyPolicyPage'
import PageFooter from './components/PageFooter'
import 'mustard-ui'
import './dark-mode.scss'
import './styles.scss'
import '@fortawesome/fontawesome-pro/css/all.css'

const html = registerHtml({
	HomePage, DebugPage, RoomPage, GoogleAPI, GoogleAuthDialog, Firestore, JoinRoomPrompt, CreateRoomPrompt, LoadingPage, LoginHeader, PageFooter, PrivacyPolicyPage
})

const home = () => {
	const [isGoogleInitialzed] = useGlobalObservable('gapi.isGoogleInitialized')
	const [isSignedIn] = useGlobalObservable('gapi.isSignedIn')

	const hasReversedColorMode = localStorage.getItem('forced-reverse-color') === 'true'

	// keep forceReverseColorMode in sync with localstorage
	useEffect(() => {
		const [forceReverseColorMode] = useGlobalObservable('forced-reverse-color', hasReversedColorMode)
		console.log({ forceReverseColorMode })
		localStorage.setItem('forced-reverse-color', forceReverseColorMode)
		console.log('storage value', localStorage.getItem('forced-reverse-color'))
	})

	// effect to read if the system is set in dark mode
	useEffect(() => {
		const [, setDoesSystemPerferDark] = useGlobalObservable('system-perfers-dark')

		// read the page media query perfers-color-scheme
		const perfersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)')

		// update the system preference
		const onUpdatedQuery = updatedQuery => setDoesSystemPerferDark(updatedQuery.matches)
		onUpdatedQuery(perfersDarkQuery)

		// Attach listener function on state changes
		perfersDarkQuery.addListener(onUpdatedQuery)

		return () => {
			perfersDarkQuery.removeListener(onUpdatedQuery)
		}
	})

	// effect to read if the page should display in dark mode
	// read if a forced value is set to override
	useEffect(() => {
		const [forceReverseColorMode] = useGlobalObservable('forced-reverse-color', hasReversedColorMode)
		const [systemPerfersDarkMode] = useGlobalObservable('system-perfers-dark')

		console.log({ forceReverseColorMode })
		console.log({ systemPerfersDarkMode })
		// update the page
		document.documentElement.setAttribute('dark-mode', Boolean(forceReverseColorMode ^ systemPerfersDarkMode))
	})

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
				return html`<LoadingPage />`
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
		<div class="app-container">
			<GoogleAPI />
			<Firestore />
			<LoginHeader />
			<div class="page-content">
				${currentPage}
			</div>
			<JoinRoomPrompt />
			<CreateRoomPrompt />
			<PageFooter />
		</div>
	`
}
start('#app', home)
