import { registerHtml, useEffect } from 'tram-one'
import { initializeApp } from './useFirestore'

const html = registerHtml()

// component to load the google API onto the window
// it makes available a gapi object on the window
export default () => {
	useEffect(initializeApp)
	return html`
		<div>
		</div>
	`
}
