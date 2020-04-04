// hook for interacting with the google auth and calendar api
// api docs https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest

import { registerHtml } from 'tram-one'
import { onLoad, useGAPIClient } from './useGoogleAPI'

const html = registerHtml()

// component to load the google API onto the window
// it makes available a gapi object on the window
export default () => {
	useGAPIClient()
	return html`
		<script async defer src="https://apis.google.com/js/api.js"
			onload=${onLoad}>
		</script>
	`
}
