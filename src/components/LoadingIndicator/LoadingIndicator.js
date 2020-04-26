import { registerHtml } from 'tram-one'
import './LoadingIndicator.scss'

const html = registerHtml()

export default ({ primary = '#66adeb', secondary = '#58585880' }, children) => {
	return html`
    <div class="LoadingIndicator">
			<i class="fad fa-spinner-third" style=${`--fa-primary-color: ${primary}; --fa-secondary-color: ${secondary};`}></i>
    </div>
  `
}
