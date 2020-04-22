import { registerHtml, useGlobalObservable, useObservable } from 'tram-one'
import { checkDatabase } from '../Firestore'
import './JoinRoomPrompt.scss'

const html = registerHtml()

const goToRoomPage = room => window.history.pushState({}, '', `/room/${room}`)

export default (props, children) => {
	const [showJoinPrompt, setJoinPrompt] = useGlobalObservable('join-prompt', false)
	const [roomData] = useGlobalObservable('room-data')
	const [isJoining, setIsJoining] = useObservable(false)
	const [isValidRoom, setIsValidRoom] = useObservable(true)
	const [roomId, setRoomId] = useObservable('')

	const onDismiss = () => {
		setJoinPrompt(false)
	}

	const onJoinRoom = async event => {
		// prevent default form submission logic
		event.preventDefault()

		// loading while we verify the room and load data
		setIsJoining(true)

		// get roomId that we're trying to join
		const form = event.target
		const formRoomId = form.roomId.value
		setRoomId(formRoomId)

		const databaseRef = await checkDatabase(formRoomId).get()
		setIsJoining(false)

		if (!databaseRef.exists) {
			setIsValidRoom(false)
			return
		}

		goToRoomPage(formRoomId)
		setIsValidRoom(true)
		setJoinPrompt(false)
	}

	if (!showJoinPrompt) {
		return html`<div class="JoinRoomPrompt" />`
	}

	const inputClass = isValidRoom ? '' : 'invalid'
	const inputMessage = isJoining ? 'Loading...' : isValidRoom ? '' : 'Could not Find Room'

	return html`
    <div class="JoinRoomPrompt">
      <div class="modal-mask">
        <div class="modal">
          <div class="modal-head">
              <p class="modal-title">Join a Room</p>
          </div>
					<!-- form for interacting with the input and handling the enter / click actions -->
					<form onsubmit=${onJoinRoom}>
						<div class="modal-body">
								<div class="form-control">
										<label for="roomId">Room ID</label>
										<input class=${inputClass} type="text" id="roomId" name="roomId" autofocus placeholder="Enter Room ID" value=${roomId} />
										<p class="validation-error">${inputMessage}</p>
								</div>
						</div>
						<div class="modal-footer JoinRoomPrompt-controls">
								<input type="submit" class="button-primary" value="Join" />
								<button onclick=${onDismiss} class="button-info">Cancel</button>
						</div>
					</form>
        </div>
      </div>
    </div>
  `
}
