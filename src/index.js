import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start, useUrlParams, useGlobalObservable, useEffect, useObservable } from 'tram-one'
import RenamePrompt from './components/RenamePrompt'
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
import AboutPage from './components/AboutPage'
import PageFooter from './components/PageFooter'
import 'mustard-ui'
import './dark-mode.scss'
import './styles.scss'
import './fonts/font.scss'
import '@fortawesome/fontawesome-pro/css/all.css'

const html = registerHtml({
	HomePage, DebugPage, RoomPage, GoogleAPI, GoogleAuthDialog, Firestore,
	JoinRoomPrompt, CreateRoomPrompt, LoadingPage, LoginHeader, PageFooter,
	PrivacyPolicyPage, AboutPage, RenamePrompt
})

const home = () => {
	const [isGoogleInitialzed] = useGlobalObservable('gapi.isGoogleInitialized')
	const [isSignedIn] = useGlobalObservable('gapi.isSignedIn')
	const [fontsReady, setFontsReady] = useObservable('not-loaded')

	// effect to update the page when fonts have been loaded
	useEffect(async () => {
		const { status } = await document.fonts.ready
		setFontsReady(status)
	})

	// keep forceReverseColorMode in sync with localstorage
	useEffect(() => {
		const hasReversedColorMode = localStorage.getItem('forced-reverse-color') === 'true'
		const [forceReverseColorMode] = useGlobalObservable('forced-reverse-color', hasReversedColorMode)
		localStorage.setItem('forced-reverse-color', forceReverseColorMode)
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
		const [forceReverseColorMode] = useGlobalObservable('forced-reverse-color')
		const [systemPerfersDarkMode] = useGlobalObservable('system-perfers-dark')

		// update the page
		document.documentElement.setAttribute('dark-mode', Boolean(forceReverseColorMode ^ systemPerfersDarkMode))
	})

	const router = () => {
		if (useUrlParams('/about')) return html`<AboutPage />`

		if (useUrlParams('/debug')) return html`<DebugPage />`

		if (useUrlParams('/policy')) return html`<PrivacyPolicyPage />`

		if (useUrlParams('/room/:roomId')) {
			// if the google client hasn't initialized yet, show a loading page
			if (!isGoogleInitialzed) return html`<LoadingPage />`

			// if we are not signed in, start the auth flow
			if (!isSignedIn) return html`<HomePage><GoogleAuthDialog /></HomePage>`

			// we are signed in, go to the room page!
			return html`<RoomPage />`
		}

		// by default, show the home page
		return html`<HomePage />`
	}

	const currentPage = router()
	return html`
		<div class="app-container font-${fontsReady}">
			<GoogleAPI />
			<Firestore />
			<LoginHeader />
			<div class="page-content">
				${currentPage}
			</div>
			<JoinRoomPrompt />
			<CreateRoomPrompt />
			<RenamePrompt />
			<PageFooter />
		</div>
	`
}
start('#app', home)
