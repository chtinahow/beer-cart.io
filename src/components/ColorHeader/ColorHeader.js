import { registerHtml } from 'tram-one'
import './ColorHeader.scss'
import useColor from '../../hooks/useColor'

const html = registerHtml()

export default () => {
	const [color, incrementColor] = useColor()

  return html`
    <div class="color-header">
      <h1
        style="color:${color}"
        role="heading"
        onclick=${incrementColor}
      >
        beercart.io
      </h1>
      <a style="color:${color}">Login</a>
    </div>
  `
}
