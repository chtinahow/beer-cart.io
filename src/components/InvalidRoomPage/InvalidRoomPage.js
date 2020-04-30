import { registerHtml } from 'tram-one'
import './InvalidRoomPage.scss'

const html = registerHtml()

export default (props, children) => {
	return html`
    <div class="InvalidRoomPage Page">
      <h2>
        No Room Found
      </h2>
      <p>
				We looked everywhere, and we couldn't find a room with the id <span class="roomId">${props.roomId}</span>. <br/>
				Please contact whoever made the room, and verify the url. <br/>
        If you are the one who created the room, please reach out to us, and we'll do our best to fix it!
      </p>
    </div>
  `
}
