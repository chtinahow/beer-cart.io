import { registerHtml, useGlobalObservable } from 'tram-one'
import AvatarGroup from '../AvatarGroup'
import './Conversation.scss'

const html = registerHtml({
	AvatarGroup
})

export default (props, children) => {
	const [, setConversationToast] = useGlobalObservable('conversation-toast', false)
	const [currentConversation] = useGlobalObservable('current-conversation-data', { users: [] })

	// We will have a hook to get users and a link of a room
	const { users, link } = props

	// if there is no link, these people are not part of a conversation
	const isNoGroup = link === ''

	const userNameString = users.length > 3 ? users.slice(0, 3).map(user => user.name).join(', ') + ` and ${users.length - 3} others` : users.map(user => user.name).join(', ')

	const openHangout = async () => {
		window.open(link, '_blank', 'noreferrer,toolbar=0,status=0,width=626,height=436')
		setConversationToast(true)
		currentConversation.link = link
		currentConversation.users = users
	}

	const conversationTitle = isNoGroup ? 'Not in a conversation' : userNameString

	const joinConversationButton = html`<button class="button-primary" onclick=${openHangout}>Join Conversation</button>`
	const createConversationButton = html`<button class="button-info" onclick=${openHangout}>Create Conversation</button>`
	const conversationAction = isNoGroup ? createConversationButton : joinConversationButton

	return html`
    <div class="Conversation">
			<div>${conversationTitle}</div>
      <div class="card">
        <AvatarGroup users=${users} />
        ${conversationAction}
      </div>
    </div>
  `
}
