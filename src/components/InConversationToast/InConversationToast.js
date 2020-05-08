import { registerHtml, useGlobalObservable, useUrlParams } from 'tram-one'
import { getUserObject } from '../GoogleAPI'
import { leaveConversation } from '../Firestore'
import './InConversationToast.scss'

const html = registerHtml()

export default (props, children) => {
	const [showConversationToast, setConversationToast] = useGlobalObservable('conversation-toast', false)
	const [currentConversation] = useGlobalObservable('current-conversation-data', { users: [] })

	// We will have a hook to get users and a link of a room
	// const { users, link } = props
	const { roomId } = useUrlParams('/room/:roomId')

	const userNameString = currentConversation.users.length > 3 ? currentConversation.users.slice(0, 3).map(user => user.name).join(', ') + ` and ${currentConversation.users.length - 3} others` : currentConversation.users.map(user => user.name).join(', ')

	const openHangout = async () => {
		window.open(currentConversation.link, '_blank', 'noreferrer,toolbar=0,status=0,width=626,height=436')
		setConversationToast(true)
	}

	const onLeaveConversation = async () => {
		const [roomData] = useGlobalObservable('room-data')
		const [roomRef] = useGlobalObservable('room-ref', {})

		// update the server that we joined the conversation
		const user = getUserObject()
		leaveConversation(roomData, roomRef, user)
		setConversationToast(false)
	}

	const conversationButtons = html`
		<div class="button-group">
			<button class="button-info-text" onclick=${openHangout}>Rejoin</button>
			<button class="button-danger-text" onclick=${onLeaveConversation}>Leave</button>
		</div>
	`

	if (!showConversationToast) {
		return html`<div class="InConversationToast" />`
	}

	return html`
    <div class="InConversationToast alert alert-info alert-border">
      <div class="toast-content">
				Joined Conversation with: ${userNameString}
				${conversationButtons}
			</div>
    </div>
  `
}
