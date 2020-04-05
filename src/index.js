import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start } from 'tram-one'
import LoginHeader from './components/LoginHeader'
import HomepageHeader from './components/HomepageHeader'
import './styles.scss'
import useColor from './hooks/useColor'
import GoogleAPI, { useNewHangoutLink } from './components/GoogleAPI'
import 'mustard-ui'

const html = registerHtml({
	LoginHeader, GoogleAPI, HomepageHeader
})

const home = () => {
	const [color] = useColor()
	return html`
    <div>
			<GoogleAPI />
      <LoginHeader />
      <HomepageHeader />
      <div style="color:${color}"> Thank you for using Tram-One! </div>
    </div>
  `
}

start('#app', home)
