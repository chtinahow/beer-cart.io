import { registerHtml } from 'tram-one'
import { signIn } from '../GoogleAPI'
import './GoogleAuthDialog.scss'

const html = registerHtml()

const goToHomePage = room => window.history.pushState({}, '', '/')

export default (props, children) => {
	return html`
    <div class="modal-mask GoogleAuthDialog">
        <div class="modal">
            <div class="modal-head">
                <p class="modal-title">Please Sign In To Continue</p>
            </div>
            <div class="modal-footer">
              <button onclick=${goToHomePage} class="button-info">Dismiss</button>
              <button onclick=${signIn} class="button-primary">Sign in</button>
            </div>
        </div>
    </div>
  `
}
