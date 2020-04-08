import { registerHtml } from 'tram-one'
import AvatarGroup from '../AvatarGroup'
import './Conversation.scss'

const html = registerHtml({
  AvatarGroup
})

//TODO actually make hook
const useRoomData = () => {
  return {users: [{name: 'jesse', avatar: null}, {name: 'sprocket', avatar: null}], link: 'https://meet.google.com/sin-kead-jfc?authuser=1' }
}

export default (props, children) => {
  // We will have a hook to get users and a link of a room
  const { users, link } = useRoomData()

  const openHangout = async () => {
		window.open(link, '_blank', 'noreferrer,toolbar=0,status=0,width=626,height=436')
	}

  return html`
    <div class="Conversation card">
      <AvatarGroup users=${users} />
      <ul class="card-actions">
        <li><button class="button-primary" onclick=${openHangout}>Join Room</button></li>
      </ul>
    </div>
  `
}
