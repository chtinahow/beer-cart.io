import { registerHtml, useGlobalObservable } from 'tram-one'
import AvatarGroup from '../AvatarGroup'
import './Conversation.scss'

const html = registerHtml({
  AvatarGroup
})

//TODO actually make hook
const useRoomData = () => {
  return {users: [{name: 'jesse', avatar: null}, {name: 'sprocket', avatar: null}, {name: 'Tina', avatar: null}, {name: 'George', avatar: null}, {name: 'Randy', avatar: null}], link: 'https://meet.google.com/sin-kead-jfc?authuser=1' }
}

export default (props, children) => {
	const [showConversationToast, setConversationToast] = useGlobalObservable('conversation-toast', false)

  // We will have a hook to get users and a link of a room
	const { users, link } = useRoomData()
	
	const userNameString = users.length > 3 ? users.slice(0,3).map( user => user.name).join(', ') + ` and ${users.length - 3} others` : users.map( user => user.name).join(', ')

  const openHangout = async () => {
    window.open(link, '_blank', 'noreferrer,toolbar=0,status=0,width=626,height=436')
    setConversationToast(true)
	}

  return html`
    <div class="Conversation">
			<div>${userNameString}</div>
      <div class="card">
        <AvatarGroup users=${users} />
        <button class="button-primary" onclick=${openHangout}>Join Room</button>
      </div>
    </div>
  `
}
