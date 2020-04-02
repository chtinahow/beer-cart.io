import { registerHtml } from 'tram-one'
import './ColorHeader.scss'
import useColor from '../../hooks/useColor'

const html = registerHtml()

export default () => {
	const [color, incrementColor] = useColor()

	return html`
    <h1
      class="color-header"
      style="color:${color}"
			role="heading"
      onclick=${incrementColor}
    >
      beercart.io
    </h1>
  `
}
