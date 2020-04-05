import { registerHtml } from 'tram-one'
// import { signIn } from './components/GoogleAPI'
import './LoginHeader.scss';
import BeerMug from '../../../clinking-beer-mugs_1f37b.png'

const html = registerHtml()

export default (props, children) => {
	return html`
    <nav class="LoginHeader">
			<div class="nav-container">
					<div class="nav-logo">
							<img src=${BeerMug} width="50" height="50" />
							<a href="/">BeercartIO</a>
					</div>
					<ul class="nav-links">
							<li><a href="/docs/installation">Login</a></li>
					</ul>
			</div>
		</nav>
  `
}
