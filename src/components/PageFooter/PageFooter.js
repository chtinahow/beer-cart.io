import { registerHtml } from 'tram-one'
import './PageFooter.scss'

const html = registerHtml()

export default (props, children) => {
	return html`
    <div class="PageFooter">
      <footer>
        <p class="copyright align-center">Made with Tram-one by Jesse Jurman and Tina Howard. Licensed under the MIT License.</p>
      </footer>
    </div>
  `
}
