import { registerHtml, useUrlParams, useGlobalObservable, useEffect } from 'tram-one'
import { getUserObject } from '../GoogleAPI'
import Conversation from '../Conversation'
import InConversationToast from '../InConversationToast'
import { useFirestore, joinRoom } from '../Firestore'
import './RoomPage.scss'

const html = registerHtml({
	Conversation, InConversationToast
})

const goToHomepage = () => window.history.pushState({}, '', '/')

export default (props, children) => {
	const { roomId } = useUrlParams('/room/:roomId')
	const [roomData] = useGlobalObservable('room-data')

	useFirestore(roomId)

	// join room hook
	useEffect(async () => {
		const [isSignedIn] = useGlobalObservable('gapi.isSignedIn', false)
		const [roomData] = useGlobalObservable('room-data')
		const [roomRef] = useGlobalObservable('room-ref')

		if (!isSignedIn || !roomData || !roomRef) return
		const user = getUserObject()
		joinRoom(roomData, roomRef, user)
	})

	// if we don't have the room data yet, showing a loading indicator
	if (!roomData) {
		// TODO loading component
		return html`<div class="RoomPage">Loading...</div>`
	}

	// sort conversations such that the no-group (has no link) appears last
	const sortedConversations = roomData.conversations.sort((convA, convB) => {
		return convA.link.localeCompare(convB.link)
	}).reverse()

	const conversationDom = sortedConversations.map(
		conversation => html`<Conversation ${conversation} />`
	)

	return html`
    <div class="RoomPage Page">
      <InConversationToast />
      <h1>${roomData.roomName}</h1>
      <div class="conversation-grid">
        ${conversationDom}
      </div>
    </div>
  `
}
