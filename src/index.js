import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start } from 'tram-one'
import ColorHeader from './components/ColorHeader'
import './styles.css'
import useColor from './hooks/useColor'
import GoogleAPI, { useNewHangoutLink } from './components/GoogleAPI'

const html = registerHtml({
	ColorHeader, GoogleAPI
})

const home = () => {
	const [color] = useColor()
	return html`
    <div>
			<GoogleAPI />
      <ColorHeader />
      <div style="color:${color}"> Thank you for using Tram-One! </div>
    </div>
  `
}

start('#app', home)
