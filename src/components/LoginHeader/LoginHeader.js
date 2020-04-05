import { registerHtml } from 'tram-one'
import { signIn } from './components/GoogleAPI'
import './LoginHeader.scss'

const html = registerHtml()

export default (props, children) => {
	return html`
    <nav class="LoginHeader">
			<div class="nav-container">
					<div class="nav-logo">
							<a href="/">BeercartIO</a>
					</div>
					<ul class="nav-links">
							<li><a href="/docs/installation">Login</a></li>
					</ul>
			</div>
		</nav>
  `
}
