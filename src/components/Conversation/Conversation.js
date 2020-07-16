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
	const [, setErrorToast] = useGlobalObservable('error-toast', false)
	const [, setRenamingConversation] = useGlobalObservable('renaming-conversation-link')

	const [currentConversation] = useGlobalObservable('current-conversation-data', { users: [] })

	// pull these so that this component refreshes when it updates?
	// TODO verify if we need these
	const [roomData] = useGlobalObservable('room-data')

	// We will have a hook to get users and a link of a room
	const { users, link, title } = props

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
		try {
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
		} catch (error) {
			// if there was an error creating the hangout, they probably don't have calendar permissions
			// show error toast
			setErrorToast(true)
		}
	}

	const launchRenamePrompt = () => {
		setRenamingConversation(link)
	}

	const conversationTitle = (() => {
		if (isNoGroup) return 'Not in a conversation'
		const hasTitle = Boolean(title)
		if (hasTitle) return title
		return userNameString
	})()

	const joinConversationButton = html`<button class="button-primary" onclick=${openHangout}>Join</button>`
	const renameConversationButton = html`<button class="button-info" onclick=${launchRenamePrompt}>Rename</button>`
	const createConversationButton = html`<button class="button-info" onclick=${createHangout}>Create Conversation</button>`
	const conversationActions = (() => {
		if (isNoGroup) return createConversationButton
		return html`<div class="actions">${[joinConversationButton, renameConversationButton]}</div>`
	})()

	return html`
    <div class="Conversation">
			<label>${conversationTitle}</label>
      <div class="card">
        <AvatarGroup users=${users} />
				${conversationActions}
      </div>
    </div>
  `
}
