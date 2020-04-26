import { registerHtml, useGlobalObservable } from 'tram-one'
import { createRoom } from '../Firestore'
import './CreateRoomPrompt.scss'

const html = registerHtml()

const goToRoomPage = room => window.history.pushState({}, '', `/room/${room}`)

export default (props, children) => {
	const [showCreatePrompt, setCreatePrompt] = useGlobalObservable('create-prompt', false)

	const onDismiss = () => {
		setCreatePrompt(false)
	}

	const onCreateRoom = async event => {
		event.preventDefault()
		const form = event.target
		const roomId = await createRoom(form.roomName.value)
		goToRoomPage(roomId)
		setCreatePrompt(false)
	}

	if (!showCreatePrompt) {
		return html`<div class="CreateRoomPrompt" />`
	}

	return html`
    <div class="CreateRoomPrompt">
    <div class="modal-mask">
        <div class="modal">
          <div class="modal-head">
              <p class="modal-title">Create a Room</p>
          </div>
					<!-- form for interacting with the input and handling the enter / click actions -->
					<form onsubmit=${onCreateRoom}>
						<div class="modal-body">
								<div class="form-control">
										<label for="roomName">Room Name</label>
										<input type="text" id="roomName" name="roomName" autofocus placeholder="Enter Room Name" />
								</div>
						</div>
						<div class="modal-footer CreateRoomPrompt-controls">
								<input type="submit" class="button-primary" value="Create" />
								<button onclick=${onDismiss} class="button-info">Cancel</button>
						</div>
					</form>
        </div>
      </div>
    </div>
  `
}
