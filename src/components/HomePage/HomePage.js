import { registerHtml } from 'tram-one'
import ConversationPreview from '../ConversationPreview'
import GoogleAPI from '../GoogleAPI'
import Hero from '../Hero'
import LoginHeader from '../LoginHeader'
import './HomePage.scss'

const html = registerHtml({
  ConversationPreview, GoogleAPI, Hero, LoginHeader
})

export default (props, children) => {
  return html`
    <div class="HomePage">
      <LoginHeader />
      <Hero />
      <ConversationPreview />
    </div>
  `
}
