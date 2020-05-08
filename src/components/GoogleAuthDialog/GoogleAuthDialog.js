import { registerHtml } from 'tram-one'
import { signIn } from '../GoogleAPI'
import './GoogleAuthDialog.scss'

const html = registerHtml()

const goToHomePage = () => window.history.pushState({}, '', '/')

export default (props, children) => {
	const onDismiss = () => {
		// if we have a onDismiss prop, call that instead
		if (props.onDismiss) {
			props.onDismiss()
			return
		}

		// by default, call goToHomePage
		goToHomePage()
	}

	return html`
    <div class="modal-mask GoogleAuthDialog">
        <div class="modal">
            <div class="modal-head">
                <p class="modal-title">Please Sign In To Continue</p>
						</div>
						<div class="modal-body">
							<h3>Sign in using Google Auth</h3>
							<p>
								Hello! We're going to ask you to sign in, and give us permissions for your calendar.
								This is because we use the Calendar API to create the Hangout Conferencing used by beer-cart.io.
								Don't worry though - no calendar information is read by our system.
							</p>
						</div>
            <div class="modal-footer">
              <button onclick=${onDismiss} class="button-info">Dismiss</button>
              <button onclick=${signIn} class="button-primary">Sign in</button>
            </div>
        </div>
    </div>
  `
}
