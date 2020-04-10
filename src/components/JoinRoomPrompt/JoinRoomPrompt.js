import { registerHtml, useGlobalObservable, useEffect } from 'tram-one'
import './JoinRoomPrompt.scss'

const html = registerHtml()

const goToRoomPage = room => window.history.pushState({}, '', `/room/${room}`)

export default (props, children) => {
	const [showJoinPrompt, setJoinPrompt] = useGlobalObservable('join-prompt', false)

	const onDismiss = () => {
		setJoinPrompt(false)
	}

	const onJoinRoom = event => {
		event.preventDefault()
		const form = event.target
		goToRoomPage(form.roomId.value)
		setJoinPrompt(false)
	}

	if (!showJoinPrompt) {
		return html`<div class="JoinRoomPrompt" />`
	}

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
										<input type="text" id="roomId" name="roomId" autofocus placeholder="Enter Room ID">
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
