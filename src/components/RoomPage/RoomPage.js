import { registerHtml, useUrlParams, useGlobalObservable, useEffect } from 'tram-one'
import { getUserObject } from '../GoogleAPI'
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

	// get room data hook
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

	// join room hook
	useEffect(async () => {
		const [isSignedIn] = useGlobalObservable('gapi.isSignedIn', false)
		const [roomData] = useGlobalObservable('room-data', {})

		if (!isSignedIn) return
		const user = getUserObject()
		const joinRoomRequest = await fetch(`/api/joinRoom/${roomId}`, {
			method: 'POST', body: JSON.stringify({
				roomId, user
			})
		})
		roomData[roomId] = await joinRoomRequest.json()
	})

	// if we don't have the room data yet, showing a loading indicator
	if (roomData[roomId] === undefined) {
		// TODO loading component
		return html`<div class="RoomPage">Loading...</div>`
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
    <div class="RoomPage Page">
      <InConversationToast />
      <h1>${roomData[roomId].roomName}</h1>
      <div class="conversation-grid">
        ${conversationDom}
      </div>
    </div>
  `
}
