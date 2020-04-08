import { registerHtml } from 'tram-one'
import './ConversationPreview.scss'
import ConversationImage from '../../../conversation.png';

const html = registerHtml()

export default (props, children) => {
  return html`
    <div class="ConversationPreview">
    <img src=${ConversationImage} width="100%"/>
    </div>
  `
}
