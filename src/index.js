import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start } from 'tram-one'
import ColorHeader from './components/ColorHeader'
import './styles.css'
import useColor from './hooks/useColor'

const html = registerHtml({
	ColorHeader
})

const home = () => {
	const [color] = useColor()
	return html`
    <div>
      <ColorHeader />
      <div style="color:${color}"> Thank you for using Tram-One! </div>
    </div>
  `
}

start('#app', home)
