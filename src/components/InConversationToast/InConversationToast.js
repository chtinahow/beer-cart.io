import { registerHtml, useGlobalObservable } from 'tram-one'
import './InConversationToast.scss'

const html = registerHtml()

export default (props, children) => {
	const [showConversationToast, setConversationToast] = useGlobalObservable('conversation-toast', false)
  

  if(!showConversationToast) {
    return html `<div class="InConversationToast" />`
  }

  return html`
    <div class="InConversationToast">
      <p class="alert alert-info alert-border">Joined Conversation</p>
    </div>
  `
}
