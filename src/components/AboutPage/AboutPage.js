import { registerHtml } from 'tram-one'
import './AboutPage.scss'

const html = registerHtml()

export default (props, children) => {
	return html`
    <div class="AboutPage Page">
			<h1>About beer-cart.io</h1>
			<h2>The Project</h2>
			<p>
				beer-cart.io is a free open-source lobby that allows users to create lobbies for google hangout and google meet.
				beer-cart.io was created in order to facilitate the large informal meetings and discussions that are usually present in offices or meetups.
				With more and more people working from home, we hope that this tool will help keep this atmosphere going in as natural a way as possible.
			</p>

			<h2>The People</h2>
			<p>
				The Project was created by Jesse Jurman and Tina Howard.
			</p>

			<h2>The Technologies</h2>
			<p>
				The front end for the project was built using Tram-One, a view framework also created by Jesse Jurman.
				It is powered by Google APIs and Firebase.
			</p>
    </div>
  `
}
