import { registerHtml } from 'tram-one'
import './PageFooter.scss'

const html = registerHtml()

export default (props, children) => {
	return html`
    <div class="PageFooter">
      <footer>
				<a class="copyright" href="/about">Learn more about the project. </a>
				<a class="copyright" href="https://tram-one.io/">Created in Tram-One. </a>
				<a class="copyright" href="/policy">Read our Privacy Policy. </a>
				<a class="copyright" href="https://forms.gle/cbJHdpUuQcb9SGRS9">Leave Feedback. </a>
      </footer>
    </div>
  `
}
