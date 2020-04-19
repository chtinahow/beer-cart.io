import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start, useUrlParams } from 'tram-one'
import DebugPage from './components/DebugPage'
import HomePage from './components/HomePage'
import LoginHeader from './components/LoginHeader'
import RoomPage from './components/RoomPage'
import GoogleAPI from './components/GoogleAPI'
import JoinRoomPrompt from './components/JoinRoomPrompt'
import CreateRoomPrompt from './components/CreateRoomPrompt'
import PrivacyPolicyPage from './components/PrivacyPolicyPage'
import './styles.scss'
import 'mustard-ui'

const html = registerHtml({
	HomePage, DebugPage, RoomPage, GoogleAPI, JoinRoomPrompt, CreateRoomPrompt, LoginHeader, PrivacyPolicyPage
})

const home = () => {
	const router = () => {
		if (useUrlParams('/debug')) {
			return html`<DebugPage />`
		}
		if (useUrlParams('/policy')) {
			return html`<PrivacyPolicyPage />`
		}
		if (useUrlParams('/room/:roomId')) {
			return html`<RoomPage />`
		}
		return html`
			<div>
				<HomePage />
			</div>
		`
	}

	const currentPage = router()
	return html`
		<div>
			<GoogleAPI />
			<LoginHeader />
			${currentPage}
			<JoinRoomPrompt />
			<CreateRoomPrompt />
		</div>
	`
}
start('#app', home)
