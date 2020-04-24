import { registerHtml, useUrlParams, useGlobalObservable, useEffect } from 'tram-one'
import { getUserObject } from '../GoogleAPI'
import Conversation from '../Conversation'
import LoadingPage from '../LoadingPage'
import InConversationToast from '../InConversationToast'
import { useFirestore, joinRoom, leaveRoom } from '../Firestore'
import './RoomPage.scss'

const html = registerHtml({
	Conversation, InConversationToast, LoadingPage
})

const goToHomepage = () => window.history.pushState({}, '', '/')

export default (props, children) => {
	const { roomId } = useUrlParams('/room/:roomId')
	const [roomData] = useGlobalObservable('room-data')

	useFirestore(roomId)

	// join room hook
	useEffect(() => {
		const [isSignedIn] = useGlobalObservable('gapi.isSignedIn')
		const [roomData] = useGlobalObservable('room-data')
		const [roomRef] = useGlobalObservable('room-ref')

		if (!isSignedIn || !roomData || !roomRef) return
		const user = getUserObject()
		joinRoom(roomData, roomRef, user)

		// cleanup - if we leave this page, leave the room
		const onLeavePage = () => leaveRoom(roomData, roomRef, user)
		window.addEventListener('beforeunload', onLeavePage)

		// if this effect is cleaned up, remove the listener
		return () => {
			window.removeEventListener('beforeunload', onLeavePage)
		}
	})

	// if we don't have the room data yet, showing a loading indicator
	if (!roomData) {
		// TODO loading component
		return html`<div class="RoomPage"><LoadingPage /></div>`
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
