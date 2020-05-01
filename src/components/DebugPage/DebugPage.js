import { registerHtml } from 'tram-one'
import LoadingIndicator from '../LoadingIndicator'
import { signIn, createNewHangoutLink, useGoogleOAuthSignedInStatus } from '../GoogleAPI'
import './DebugPage.scss'

const html = registerHtml({ LoadingIndicator })

export default () => {
	const { isSignedIn } = useGoogleOAuthSignedInStatus()

	const openHangout = async () => {
		const hangoutLink = await createNewHangoutLink()
		window.open(hangoutLink, '_blank', 'noreferrer,toolbar=0,status=0,width=626,height=436')
	}

	return html`
    <div class="DebugPage Page">
			<h1>Debug Page</h1>
			<LoadingIndicator />
			<button onclick=${signIn}>Sign In</button>
			${isSignedIn ? 'Signed In' : 'Not Signed In'}
			<button onclick=${openHangout}>Launch New Hangout</button>
    </div>
  `
}
