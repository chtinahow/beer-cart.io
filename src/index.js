import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start, useUrlParams } from 'tram-one'
import LoginHeader from './components/LoginHeader'
import HomepageHeader from './components/HomepageHeader'
import DebugPage from './components/DebugPage'
import './styles.scss'
import GoogleAPI from './components/GoogleAPI'
import 'mustard-ui'

const html = registerHtml({
	LoginHeader, GoogleAPI, HomepageHeader, DebugPage
})

const home = () => {
	if (useUrlParams('/debug')) {
		return html`<DebugPage />`
	}
	return html`
    <div>
			<GoogleAPI />
      <LoginHeader />
      <HomepageHeader />
    </div>
  `
}

start('#app', home)
