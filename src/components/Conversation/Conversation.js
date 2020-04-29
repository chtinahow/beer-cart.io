import { registerHtml, useGlobalObservable, useUrlParams } from 'tram-one'
import { getUserObject, createNewHangoutLink } from '../GoogleAPI'
import { createConversation, joinConversation } from '../Firestore'
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

	const linkId = `${link}-action`

	// if there is no link, these people are not part of a conversation
	const isNoGroup = link === ''

	const userNameString = users.length > 3 ? users.slice(0, 3).map(user => user.name).join(', ') + ` and ${users.length - 3} others` : users.map(user => user.name).join(', ')

	const openHangout = async () => {
		window.open(link, '_blank', 'noreferrer,toolbar=0,status=0,width=626,height=436')
		setConversationToast(true)
		currentConversation.link = link
		currentConversation.users = users

		// update the server that we joined the conversation
		const [roomData] = useGlobalObservable('room-data')
		const [roomRef] = useGlobalObservable('room-ref')
		const user = getUserObject()
		joinConversation(roomData, roomRef, user, link)
	}

	const createHangout = async () => {
		const newConversationLink = await createNewHangoutLink()
		window.open(newConversationLink, '_blank', 'noreferrer,toolbar=0,status=0,width=626,height=436')

		const [roomData] = useGlobalObservable('room-data')
		const [roomRef] = useGlobalObservable('room-ref')
		const user = getUserObject()

		setConversationToast(true)
		currentConversation.link = newConversationLink
		currentConversation.users = [user]

		// update the server that we created the conversation
		createConversation(roomData, roomRef, user, newConversationLink)
	}

	const conversationTitle = isNoGroup ? 'Not in a conversation' : userNameString

	const joinConversationButton = html`<button id=${linkId} class="button-primary" onclick=${openHangout}>Join Conversation</button>`
	const createConversationButton = html`<button id=${linkId} class="button-info" onclick=${createHangout}>Create Conversation</button>`
	const conversationAction = isNoGroup ? createConversationButton : joinConversationButton

	return html`
    <div class="Conversation">
			<label for=${linkId}>${conversationTitle}</label>
      <div class="card">
        <AvatarGroup users=${users} />
        ${conversationAction}
      </div>
    </div>
  `
}
