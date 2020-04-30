import { registerHtml } from 'tram-one'
import './Logo.scss'

const html = registerHtml()

export default (props, children) => {
	return html`
    <div class="Logo">
			<i class="fad fa-glass-whiskey-rocks"></i>
			<span class="logo-text">beer-cart.io</span>
    </div>
  `
}
