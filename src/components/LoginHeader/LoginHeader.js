import { registerHtml } from 'tram-one'
import BeerMug from '../../../clinking-beer-mugs_1f37b.png'
import Logo from '../Logo'
import LoginControl from '../LoginControl'
import './LoginHeader.scss'

const html = registerHtml({
	Logo, LoginControl
})

export default () => {
	return html`
    <nav class="LoginHeader">
			<a href="/" class="nav-logo">
					<Logo />
			</a>
			<LoginControl />
		</nav>
  `
}
