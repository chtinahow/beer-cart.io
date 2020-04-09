import { registerHtml, useUrlParams  } from 'tram-one'
import Conversation from '../Conversation'
import './RoomPage.scss'

const html = registerHtml({
  Conversation
})

export default (props, children) => {
  const { roomId } = useUrlParams('/room/:roomId')
  return html`
    <div class="RoomPage">
      <h1>Room Page: ${roomId}</h1>
      <div class="conversation-grid">
        <Conversation />
        <Conversation />
      </div>
    </div>
  `
}
