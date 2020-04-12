import { registerHtml, useUrlParams, useGlobalObservable, useEffect } from 'tram-one'
import Conversation from '../Conversation'
import InConversationToast from '../InConversationToast'
import './RoomPage.scss'

const html = registerHtml({
	Conversation, InConversationToast
})

const goToHomepage = () => window.history.pushState({}, '', '/')

export default (props, children) => {
	const { roomId } = useUrlParams('/room/:roomId')
	const [roomData] = useGlobalObservable('room-data', {})

	useEffect(async () => {
		const [roomData] = useGlobalObservable('room-data')
		if (roomData[roomId] === undefined) {
			// TODO abstract out this fetch logic
			const roomResponse = await fetch(`/api/getRoom/${roomId}`)
			if (roomResponse.status === 200) {
				roomData[roomId] = await roomResponse.json()
			} else {
				goToHomepage()
			}
		}
	})

	if (roomData[roomId] === undefined) {
		// TODO loading component
		return html`<div>Loading...</div>`
	}

	// sort conversations such that the no-group (has no link) appears last
	const sortedConversations = roomData[roomId].conversations.sort((convA, convB) => {
		const hasNoLink = convA.link === ''
		return hasNoLink ? 1 : -1
	})

	const conversationDom = sortedConversations.map(
		conversation => html`<Conversation ${conversation} />`
	)

	return html`
    <div class="RoomPage">
      <InConversationToast />
      <h1>${roomData[roomId].roomName}</h1>
      <div class="conversation-grid">
        ${conversationDom}
      </div>
    </div>
  `
}
