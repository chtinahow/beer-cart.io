import { registerHtml, useGlobalObservable } from 'tram-one'
import './InConversationToast.scss'

const html = registerHtml()

export default (props, children) => {
	const [showConversationToast, setConversationToast] = useGlobalObservable('conversation-toast', false)
	const [currentConversation] = useGlobalObservable('current-conversation-data', { users: [] })

	// We will have a hook to get users and a link of a room
	// const { users, link } = props

	const userNameString = currentConversation.users.length > 3 ? currentConversation.users.slice(0, 3).map(user => user.name).join(', ') + ` and ${currentConversation.users.length - 3} others` : currentConversation.users.map(user => user.name).join(', ')

	const openHangout = async () => {
		window.open(currentConversation.link, '_blank', 'noreferrer,toolbar=0,status=0,width=626,height=436')
		setConversationToast(true)
		fetch()
	}

	const leaveConversation = () => {
		// TODO Make call to function
		setConversationToast(false)
	}

	const conversationButtons = html`
		<div class="button-group">
			<button class="button-info-text" onclick=${openHangout}>Rejoin</button>
			<button class="button-danger-text" onclick=${leaveConversation}>Leave</button>
		</div>
	`

	if (!showConversationToast) {
		return html`<div class="InConversationToast" />`
	}

	return html`
    <div class="InConversationToast alert alert-info alert-border">
      <div class="toast-content">Joined Conversation with: ${userNameString}
				${conversationButtons}
			</div>
    </div>
  `
}
