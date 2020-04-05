import { registerHtml } from 'tram-one'
import BeerMug from '../../../clinking-beer-mugs_1f37b.png'
import LoginControl from '../LoginControl'
import './LoginHeader.scss'

const html = registerHtml({
	LoginControl
})

export default () => {
	return html`
    <nav class="LoginHeader">
			<div class="nav-container">
					<div class="nav-logo">
							<img src=${BeerMug} width="50" height="50" />
							<a href="/">BeercartIO</a>
					</div>
					<ul class="nav-links">
							<li>
								<LoginControl />
							</li>
					</ul>
			</div>
		</nav>
  `
}
