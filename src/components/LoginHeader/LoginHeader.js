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
			<a href="/" class="nav-logo">
					<img src=${BeerMug} width="50" height="50" />
					beer-cart.io
			</a>
			<LoginControl />
		</nav>
  `
}
