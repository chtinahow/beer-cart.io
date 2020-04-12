import { registerHtml } from 'tram-one'
import { signIn, signOut, useGoogleOAuthSignedInStatus, getBasicProfile } from '../GoogleAPI'
import './LoginControl.scss'

const html = registerHtml()

export default () => {
	const { isSignedIn } = useGoogleOAuthSignedInStatus()

	if (isSignedIn) {
		const name = getBasicProfile().getGivenName()
		const avatar = getBasicProfile().getImageUrl()
		return html`
			<div class="LoginControl">
				<img class="avatar" src=${avatar} />
				<select class="login-action" onchange=${signOut}>
					<option> ${name}</option>
					<option onclick=${signOut}>Log out</option>
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
