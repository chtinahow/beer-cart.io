import { registerHtml } from 'tram-one'
import { signIn, signOut, useGoogleOAuthSignedInStatus, getUserObject } from '../GoogleAPI'
import Avatar from '../Avatar'
import './LoginControl.scss'

const html = registerHtml({ Avatar })

export default () => {
	const { isSignedIn } = useGoogleOAuthSignedInStatus()

	if (isSignedIn) {
		const user = getUserObject()
		return html`
			<div class="LoginControl">
				<Avatar user=${user} />
				<select class="login-action" onchange=${signOut}>
					<option> ${user.name}</option>
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
