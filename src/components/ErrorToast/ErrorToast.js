import { registerHtml, useGlobalObservable, useUrlParams } from 'tram-one'
import { signIn } from '../GoogleAPI'
import './ErrorToast.scss'

const html = registerHtml()

export default (props, children) => {
	const [showErrorToast] = useGlobalObservable('error-toast', false)

	if (!showErrorToast) {
		return html`<div class="ErrorToast" />`
	}

	return html`
    <div class="ErrorToast alert alert-danger alert-border">
      <div class="toast-content">
				Oh no! There was an error! Did give calendar permissions?
				<button class="button-info-text" onclick=${signIn}>Enable Calendar Permissions</button>
			</div>
    </div>
  `
}
