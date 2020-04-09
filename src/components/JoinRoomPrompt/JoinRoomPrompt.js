import { registerHtml, useGlobalObservable } from 'tram-one'
import './JoinRoomPrompt.scss'

const html = registerHtml()

export default (props, children) => {
  const [showJoinPrompt, setJoinPrompt] = useGlobalObservable('join-prompt' ,false)

  const onDismiss = () => {
    setJoinPrompt(false)
  }

  if(!showJoinPrompt) {
    return html`<div class="JoinRoomPrompt" />`
  }

  return html`
    <div class="JoinRoomPrompt">
      <div class="modal-mask">
        <div class="modal">
          <div class="modal-head">
              <p class="modal-title">Join a Room</p>
          </div>
          <div class="modal-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto culpa expedita totam aperiam, aliquid, consectetur!</p>
          </div>
          <div class="modal-footer">
              <button onclick=${onDismiss} class="button-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  `
}
