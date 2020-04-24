import { registerHtml } from 'tram-one'
import Memo from '../../../memo_1f4dd.png'
import './FeedbackControl.scss'

const html = registerHtml()

export default (props, children) => {
  return html`
		<a class="FeedbackControl" href="https://forms.gle/cbJHdpUuQcb9SGRS9" target="_blank" title="Leave Feedback">
			<img src=${Memo} width="35" height="35" />
    </a>
  `
}
