import { registerHtml } from 'tram-one'
import { signIn, signOut, useGoogleOAuthSignedInStatus } from '../GoogleAPI'
import './LoginControl.scss'

const html = registerHtml()

export default () => {
	const { isSignedIn } = useGoogleOAuthSignedInStatus()

	if (isSignedIn) {
		return html`<button class="button-info-text" onclick=${signOut}>Logout</button>`
	}

	return html`
		<button class="button-info-text" onclick=${signIn}>Login</button>
  `
}
