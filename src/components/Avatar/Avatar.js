import { registerHtml } from 'tram-one'
import './Avatar.scss'

const html = registerHtml()

export default (props, children) => {
	const { user } = props
	return html`
    <img class="Avatar" src=${user.avatar} alt=${`Profile picture of ${user.name}`} title=${user.name} />
  `
}
