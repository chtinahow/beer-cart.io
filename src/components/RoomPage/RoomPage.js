import { registerHtml, useUrlParams, useGlobalObservable, useEffect, useObservable } from 'tram-one'
import { getUserObject } from '../GoogleAPI'
import Conversation from '../Conversation'
import InvalidRoomPage from '../InvalidRoomPage'
import LoadingPage from '../LoadingPage'
import InConversationToast from '../InConversationToast'
import ErrorToast from '../ErrorToast'
import { useFirestore, joinRoom, leaveRoom } from '../Firestore'
import './RoomPage.scss'

const html = registerHtml({
	Conversation, InConversationToast, LoadingPage, InvalidRoomPage, ErrorToast
})

const goToHomepage = () => window.history.pushState({}, '', '/')

export default (props, children) => {
	const { roomId } = useUrlParams('/room/:roomId')
	const [roomData] = useGlobalObservable('room-data')
	const [roomExists] = useGlobalObservable('room-exists')

	useFirestore(roomId)

	// join room hook
	useEffect(() => {
		const [isSignedIn] = useGlobalObservable('gapi.isSignedIn')
		const [roomData] = useGlobalObservable('room-data')
		const [roomRef] = useGlobalObservable('room-ref')
		const [isLeaving, setIsLeaving] = useObservable(false)

		if (!isSignedIn || !roomData || !roomRef || isLeaving) return
		const user = getUserObject()
		joinRoom(roomData, roomRef, user)

		// cleanup - if we leave this page, leave the room
		const commitLeave = leaveRoom(roomData, roomRef, user)
		const onLeave = () => {
			setIsLeaving(true)
			commitLeave()
		}
		window.addEventListener('beforeunload', onLeave)

		// if this effect is cleaned up, remove the listener
		return () => {
			window.removeEventListener('beforeunload', onLeave)
		}
	})

	// if the room doesn't exist, show an invalid page prompt
	if (!roomExists) {
		return html`<div class="RoomPage"><InvalidRoomPage roomId=${roomId} /></div>`
	}

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
			<ErrorToast />
			<h1>${roomData.roomName}</h1>
			<div class="room-id-label">Room ID: ${roomId}</div>
      <div class="conversation-grid">
        ${conversationDom}
      </div>
    </div>
  `
}
