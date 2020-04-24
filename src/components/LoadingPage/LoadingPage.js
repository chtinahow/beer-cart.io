import { registerHtml } from 'tram-one'
import LoadingIndicator from '../LoadingIndicator'
import './LoadingPage.scss'

const html = registerHtml({ LoadingIndicator })

export default (props, children) => {
	return html`
		<div class="LoadingPage Page">
			<LoadingIndicator />
		</div>
	`
}
