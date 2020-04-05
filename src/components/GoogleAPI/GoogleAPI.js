import { registerHtml } from 'tram-one'
import { onLoad } from './useGoogleAPI'

const html = registerHtml()

// component to load the google API onto the window
// it makes available a gapi object on the window
export default () => {
	return html`
		<script async defer src="https://apis.google.com/js/api.js"
			onload=${onLoad}>
		</script>
	`
}
