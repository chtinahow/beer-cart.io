import { registerHtml } from 'tram-one'
import './AvatarGroup.scss'

const html = registerHtml()

export default (props, children) => {
  const userList = props.users.map(user => html`<li>${user.name}</li>`)

  return html`
    <div class="AvatarGroup">
      <ul>${userList}</ul>
    </div>
  `
}
