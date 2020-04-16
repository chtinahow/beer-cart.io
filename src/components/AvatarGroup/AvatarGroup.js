import { registerHtml } from 'tram-one'
import Avatar from '../Avatar'
import './AvatarGroup.scss'

const html = registerHtml({
	Avatar
})

export default (props, children) => {
	const avatarList = props.users.map(user => html`<Avatar user=${user} />`)

	return html`
    <div class="AvatarGroup">
      <ul>${avatarList}</ul>
    </div>
  `
}
