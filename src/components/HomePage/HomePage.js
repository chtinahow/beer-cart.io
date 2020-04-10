import { registerHtml } from 'tram-one'
import ConversationPreview from '../ConversationPreview'
import GoogleAPI from '../GoogleAPI'
import Hero from '../Hero'
import './HomePage.scss'

const html = registerHtml({
  ConversationPreview, GoogleAPI, Hero
})

export default (props, children) => {
  return html`
    <div class="HomePage">
      <Hero />
      <ConversationPreview />
    </div>
  `
}
