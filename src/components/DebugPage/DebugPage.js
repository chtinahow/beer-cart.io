import { registerHtml } from 'tram-one'
import { signIn, createNewHangoutLink, useGoogleOAuthSignedInStatus } from '../GoogleAPI'
import './DebugPage.scss'

const html = registerHtml()

export default () => {
	const { isSignedIn } = useGoogleOAuthSignedInStatus()

	const openHangout = async () => {
		const hangoutLink = await createNewHangoutLink()
		const hangoutWindow = window.open(hangoutLink, '_blank', 'noreferrer,toolbar=0,status=0,width=626,height=436')

		const checkHangoutWindow = () => {
			if (hangoutWindow.closed && connectionTimer) {
				clearInterval(connectionTimer)
				console.log('Child window closed')
			}
		}

		const connectionTimer = setInterval(checkHangoutWindow, 500)
	}

	return html`
    <div class="DebugPage Page">
			<h1>Debug Page</h1>
			<button onclick=${signIn}>Sign In</button>
			${isSignedIn ? 'Signed In' : 'Not Signed In'}
			<button onclick=${openHangout}>Launch New Hangout</button>
    </div>
  `
}
