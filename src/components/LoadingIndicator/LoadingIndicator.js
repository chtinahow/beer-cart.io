import { registerHtml } from 'tram-one'
import './LoadingIndicator.scss'

const html = registerHtml()

export default ({ width = 100 }, children) => {
	return html`
    <div class="LoadingIndicator progress-bar striped animated">
      <span class="progress-bar-green" style=${`width: ${width}%`}></span>
    </div>
  `
}
